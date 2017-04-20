class FormSerializer < ActiveModel::Serializer
  attribute(:programId) { nil }
  attribute(:programName) { nil }
  attribute(:programUri) { nil }
  attribute :version_independent_id, key: :formId
  attribute :name, key: :formName
  attribute :form_uri, key: :formUri
  attribute :version
  attribute :published_by, serializer: UserSerializer
  def form_uri
    Rails.application.routes.url_helpers.api_form_url(object.version_independent_id, version: object.version, only_path: true)
  end
  has_many :form_questions, key: :questions, serializer: FormQuestionsSerializer
end
