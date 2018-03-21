class ImportSessionsController < ApplicationController
  authorize_resource
  load_resource only: :update

  def create
    render status: :bad_request, json: { error: 'No spreadsheet present' } if import_session_params[:file].blank?
    spreadsheet_upload = import_session_params[:file]
    @import_session = ImportSession.new(spreadsheet: spreadsheet_upload.read,
                                        original_filename: spreadsheet_upload.original_filename, created_by: current_user)
    @import_session.check!

    render json: @import_session
  end

  def update
    @survey = {}
    if import_session_params[:file].present?
      spreadsheet_upload = import_session_params[:file]
      @import_session.spreadsheet = spreadsheet_upload.read
      @import_session.original_filename = spreadsheet_upload.original_filename
      @import_session.check!
    end
    @import_session.request_survey_creation = import_session_params[:request_survey_creation]
    if @import_session.request_survey_creation && @import_session.top_level_sections > 0
      @survey = Survey.last if @import_session.create_survey!
    end
    render json: @import_session, status: :ok
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def import_session_params
    params.permit(:id, :request_survey_creation, :file)
  end
end
