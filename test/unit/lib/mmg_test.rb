require 'test_helper'
require 'sdp/importers/spreadsheet'

class MMGTest < ActiveSupport::TestCase
  SURVEY_COUNT = 1
  SECTION_COUNT = 3
  QUESTION_COUNT = 4
  RESPONSE_SET_COUNT = 2
  RESPONSE_COUNT = 6

  test 'parse_mmg' do
    u = users(:admin)
    f = './test/fixtures/files/TestMMG.xlsx'

    importer = SDP::Importers::Spreadsheet.new(f, u)
    importer.parse!

    rscount = ResponseSet.count
    rcount = Response.count
    qcount = Question.count
    sectioncount = Section.count
    surveycount = Survey.count

    importer.save!

    assert_equal rcount + RESPONSE_COUNT, Response.count
    assert_equal rscount + RESPONSE_SET_COUNT, ResponseSet.count
    assert_equal qcount  + QUESTION_COUNT, Question.count
    assert_equal sectioncount + SECTION_COUNT, Section.count
    assert_equal surveycount + SURVEY_COUNT, Survey.count

    assert Survey.where(name: f).exists?

    section = Section.where(name: 'Imported Section #1').first
    assert section.present?
    assert_equal section.questions.count, 1
    assert_equal section.concepts.count, 1
    assert_equal section.section_questions.first.position, 0
    assert_equal section.concepts.first.value, 'Data Elements'

    survey = Survey.where(name: f).first
    assert survey.sections.count, SECTION_COUNT
    assert survey.survey_sections.first.position, 0
  end
end
