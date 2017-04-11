class Form < ApplicationRecord
  include OidGenerator, Versionable, Searchable
  acts_as_commentable

  has_many :form_questions
  has_many :questions, through: :form_questions
  has_many :response_sets, through: :form_questions
  has_many :survey_forms
  has_many :surveys, through: :survey_forms

  belongs_to :created_by, class_name: 'User'

  validates :created_by, presence: true
  validates :control_number, allow_blank: true, format: { with: /\d{4}-\d{4}/,
                                                          message: 'must be a valid OMB Control Number' },
                             uniqueness: { message: 'forms should have different OMB Control Numbers',
                                           unless: proc { |f| f.version > 1 && f.other_versions.map(&:control_number).include?(f.control_number) } }

  accepts_nested_attributes_for :questions, allow_destroy: true

  after_commit :index, on: [:create, :update]
  after_commit :delete_index, on: :destroy

  def index
    UpdateIndexJob.perform_later('form', ESFormSerializer.new(self).as_json)
  end

  def delete_index
    DeleteFromIndexJob.perform_later('form', id)
  end

  def self.owned_by(owner_id)
    where(created_by: owner_id)
  end

  def publish
    update(status: 'published') if status == 'draft'
    form_questions.each do |fq|
      fq.question.publish
      fq.response_set.publish
    end
  end

  # Builds a new Form object with the same version_independent_id. Increments
  # the version by one and builds a new set of Response objects to go with it.
  def build_new_revision
    new_revision = Form.new(version_independent_id: version_independent_id,
                            description: description, status: status,
                            version: version + 1, name: name, oid: oid,
                            created_by: created_by, control_number: control_number)

    new_revision
  end

  def omb_approved?
    control_number.present?
  end

  # Get the programs that the form is associated with by the surveys that the
  # form is contained in
  def surveillance_programs
    SurveillanceProgram.joins(surveys: :survey_forms)
                       .where('survey_forms.form_id = ?', id).select(:id, :name).distinct.to_a
  end

  def surveillance_systems
    SurveillanceSystem.joins(surveys: :survey_forms)
                      .where('survey_forms.form_id = ?', id).select(:id, :name).distinct.to_a
  end
end
