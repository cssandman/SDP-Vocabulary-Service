require 'test_helper'

class SurveysControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  include ActiveJob::TestHelper

  DRAFT = 'draft'.freeze
  PUBLISHED = 'published'.freeze

  setup do
    @current_user = users(:not_admin)
    @survey = surveys(:four)
    @a_user = users(:admin)
    @group = groups(:one)
    @surveillance_program = surveillance_programs(:generic)
    sign_in @current_user
  end

  test 'should get index' do
    get surveys_url
    assert_response :success
  end

  test 'should get new' do
    get new_survey_url
    assert_response :success
  end

  test 'should create survey' do
    assert_enqueued_jobs 0
    assert_difference('Survey.count') do
      post surveys_url params: { survey: { linked_sections: [{ section_id: sections(:one).id, position: 0 }], name: 'Test', surveillance_program_id: @surveillance_program.id } }
    end
    assert_enqueued_jobs 5 # 1 for the survey, 1 for the section update, 2 for questions, 1 for response set
    assert_response :success
    assert_equal 1, Survey.last.sections.length
    assert_equal 'GSP', Survey.last.surveillance_program.acronym
  end

  test 'should show survey' do
    get survey_url(@survey)
    assert_response :success
  end

  test 'should destroy section if cascade is false' do
    assert_enqueued_jobs 0
    post sections_url(format: :json), params: { section: { name: 'Create test section', created_by_id: @survey.created_by_id, linked_questions: [nil], linked_response_sets: [nil] } }
    post surveys_url(format: :json), params: { survey: { name: 'Create test survey', created_by_id: @survey.created_by_id, linked_sections: [{ section_id: Section.last.id, position: 0 }] } }
    assert_difference('Survey.count', -1) do
      assert_difference('SurveySection.count', -1) do
        assert_difference('Section.count', 0) do
          delete survey_url(Survey.last), params: { cascade: 'false' }
        end
      end
    end
    assert_enqueued_jobs 4
  end

  test 'shouldnt destroy survey and surveysections' do
    assert_enqueued_jobs 0
    post sections_url(format: :json), params: { section: { name: 'Create test section', created_by_id: @survey.created_by_id, linked_questions: [nil], linked_response_sets: [nil] } }
    post surveys_url(format: :json), params: { survey: { name: 'Create test survey', created_by_id: @survey.created_by_id, linked_sections: [{ section_id: Section.last.id, position: 0 }] } }
    assert_difference('Survey.count', -1) do
      assert_difference('SurveySection.count', -1) do
        assert_difference('Section.count', -1) do
          delete survey_url(Survey.last), params: { cascade: 'true' }
        end
      end
    end
    assert_enqueued_jobs 4
  end

  test 'shouldnt destroy section if used on another survey' do
    assert_enqueued_jobs 0
    post sections_url(format: :json), params: { section: { name: 'Create test section', created_by_id: @survey.created_by_id, linked_questions: [nil], linked_response_sets: [nil] } }
    post surveys_url(format: :json), params: { survey: { name: 'No delete test survey', created_by_id: @survey.created_by_id, linked_sections: [{ section_id: Section.last.id, position: 0 }] } }
    post surveys_url(format: :json), params: { survey: { name: 'Create test survey', created_by_id: @survey.created_by_id, linked_sections: [{ section_id: Section.last.id, position: 0 }] } }
    assert_difference('Survey.count', -1) do
      assert_difference('SurveySection.count', -1) do
        assert_difference('Section.count', 0) do
          delete survey_url(Survey.last), params: { cascade: 'true' }
        end
      end
    end
    assert_enqueued_jobs 6
  end

  test 'should not publish a published survey' do
    sign_out @current_user
    @current_publisher = users(:publisher)
    sign_in @current_publisher
    @survey = surveys(:two)
    put publish_survey_url(@survey)
    assert_response :unprocessable_entity
  end

  test 'publishers should see surveys from other authors' do
    sign_out @current_user
    @current_publisher = users(:publisher)
    sign_in @current_publisher
    get survey_url(surveys(:four), format: :json)
    assert_response :success
  end

  test 'publishers should be able to publish surveys' do
    sign_out @current_user
    @current_publisher = users(:publisher)
    sign_in @current_publisher
    put publish_survey_path(surveys(:four), format: :json, params: { survey: surveys(:four) })
    assert_response :success
    assert_equal Survey.find(surveys(:four).id).status, PUBLISHED
    assert_equal Survey.find(surveys(:four).id).published_by.id, users(:publisher).id
  end

  test 'publishers should be able to retire surveys' do
    sign_out @current_user
    @current_publisher = users(:publisher)
    sign_in @current_publisher
    assert_equal Survey.find(surveys(:four).id).content_stage, 'Draft'
    put publish_survey_path(surveys(:four), format: :json, params: { survey: surveys(:four) })
    assert_response :success
    assert_equal Survey.find(surveys(:four).id).content_stage, 'Published'
    assert_equal Survey.find(surveys(:four).id).status, PUBLISHED
    assert_equal Survey.find(surveys(:four).id).published_by.id, users(:publisher).id
    put retire_survey_path(surveys(:four), format: :json, params: { survey: surveys(:four) })
    assert_equal Survey.find(surveys(:four).id).content_stage, 'Retired'
  end

  test 'can revise something you share a group with' do
    survey_json = { survey: { name: @survey.name, version_independent_id: 'SURV-1337' } }.to_json
    post surveys_url, params: survey_json, headers: { 'ACCEPT' => 'application/json', 'CONTENT_TYPE' => 'application/json' }
    Survey.last.publish(@current_user)
    Survey.last.add_to_group(@group.id)
    sign_in @a_user
    @group.add_user(@a_user)
    survey_json = { survey: { name: 'A Successful revision', version_independent_id: 'SECT-1337' } }.to_json
    post surveys_url, params: survey_json, headers: { 'ACCEPT' => 'application/json', 'CONTENT_TYPE' => 'application/json' }
    assert_response :success
  end

  test 'should add content to group' do
    sign_in @a_user
    post surveys_url(format: :json), params: { survey: { name: 'Testing.' } }
    @group.add_user(@a_user)
    put add_to_group_survey_url(Survey.last, format: :json), params: { group: @group.id }
    assert_response :success
  end

  test 'should remove content from group' do
    sign_in @a_user
    post surveys_url(format: :json), params: { survey: { name: 'Testing.' } }
    @group.add_user(@a_user)
    put remove_from_group_survey_url(Survey.last, format: :json), params: { group: @group.id }
    assert_response :success
  end

  test 'should not add content to group you arent a member of or dont own' do
    post surveys_url(format: :json), params: { survey: { name: 'Testing.' } }
    sign_in @a_user
    put add_to_group_survey_url(Survey.last, format: :json), params: { group: @group.id }
    assert_response 403
  end

  test 'authors should not be able to publish surveys' do
    put publish_survey_path(surveys(:four), format: :json, params: { survey: surveys(:four) })
    assert_response :forbidden
  end

  test 'should get redcap export ' do
    get redcap_survey_url(@survey)
    assert response.headers['Content-Disposition'].index("filename=\"#{@survey.name.parameterize.underscore}_redcap.xml\"")
    validate_redcap(response.body)
    assert_response :success
  end

  def validate_redcap(xml)
    doc = Nokogiri::XML::Document.parse(xml)
    doc.root.add_namespace_definition('odm', 'http://www.cdisc.org/ns/odm/v1.3')
    doc.root.add_namespace_definition('ds', 'http://www.w3.org/2000/09/xmldsig#')
    doc.root.add_namespace_definition('xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    doc.root.add_namespace_definition('redcap', 'https://projectredcap.org')
    question_count = @survey.survey_sections.collect { |ss| ss.section.section_nested_items.count }.sum
    assert doc
    assert doc.xpath('//odm:SectionDef').length == @survey.survey_sections.length
    assert doc.xpath('//odm:ItemGroupDef').length == @survey.survey_sections.length
    assert doc.xpath('//odm:ItemDef').length == question_count
    assert doc.xpath('//odm:ItemRef').length == question_count
  end
end
