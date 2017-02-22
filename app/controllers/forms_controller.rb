class FormsController < ApplicationController
  load_and_authorize_resource

  # GET /forms
  # GET /forms.json
  def index
    @forms = params[:search] ? Form.search(params[:search]).latest_versions : Form.latest_versions
    @users = User.all
  end

  # GET /forms/1
  # GET /forms/1.json
  def show
  end

  # GET /forms/new
  def new
    @form = Form.new
    load_supporting_resources_for_editing
  end

  # GET /forms/1/export
  def export
    @form = Form.find(params[:id])
  end

  # POST /forms
  # POST /forms.json
  def create
    @form = Form.new(form_params)
    @form.created_by = current_user
    @form.form_questions = create_form_questions(params[:form][:linked_questions], params[:form][:linked_response_sets])
    respond_to do |format|
      if @form.save
        format.html { redirect_to @form, notice: save_message(@form) }
        format.json { render :show, status: :created, location: @form }
      else
        errors = @form.errors.map { |k, v| "#{k.to_s.humanize}: #{v}" }
        format.json { render json: errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /forms/1
  # DELETE /forms/1.json
  def destroy
    @form.questions.destroy_all
    @form.destroy
    respond_to do |format|
      format.html { redirect_to forms_url, notice: 'Form was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # GET /forms/1/redcap
  def redcap
    xml = render_to_string 'forms/redcap.xml', layout: false
    send_data(xml, filename: "#{@form.name.underscore}_redcap.xml",
                   type: 'application/xml',
                   status: 200)
  end

  private

  def load_supporting_resources_for_editing
    @questions = params[:search] ? Question.search(params[:search]) : Question.all
    @response_sets = ResponseSet.latest_versions
  end

  def save_message(form)
    action = form.version > 1 ? 'revised' : 'created'
    "Form was successfully #{action}."
  end

  def create_form_questions(question_ids, response_set_ids)
    form_questions = []
    if question_ids
      question_ids.zip(response_set_ids).each do |qid, rsid|
        form_questions << FormQuestion.new(question_id: qid, response_set_id: rsid)
      end
    end
    form_questions
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def form_params
    params.require(:form).permit(:name, :user_id, :search, :version, :description,
                                 :status, :version_independent_id, :control_number)
  end
end
