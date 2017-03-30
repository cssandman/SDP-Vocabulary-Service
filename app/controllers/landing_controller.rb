# rubocop:disable Metrics/AbcSize
class LandingController < ApplicationController
  def index
  end

  def stats
    response_set_count = ResponseSet.latest_versions.count
    question_count = Question.latest_versions.count
    form_count = Form.latest_versions.count
    survey_count = Survey.latest_versions.count

    my_response_set_count = current_user ? ResponseSet.where(created_by: current_user.id).latest_versions.count : 0
    my_question_count = current_user ? Question.where(created_by: current_user.id).latest_versions.count : 0
    my_form_count = current_user ? Form.where(created_by: current_user.id).latest_versions.count : 0
    my_survey_count = current_user ? Survey.where(created_by: current_user.id).latest_versions.count : 0

    render json: { response_set_count: response_set_count, question_count: question_count,
                   form_count: form_count, survey_count: survey_count,
                   my_response_set_count: my_response_set_count, my_question_count: my_question_count,
                   my_form_count: my_form_count, my_survey_count: my_survey_count }
  end
end
# rubocop:enable Metrics/AbcSize
