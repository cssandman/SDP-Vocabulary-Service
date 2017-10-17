namespace :cleanup do
  # This should not be needed anymore, but older versions of this app did leak
  # relationships when items were deleted
  desc 'This will delete any orphaned relationships between items'
  task relationships: :environment do
    qrs_orphan_count = 0
    sq_orphan_count = 0
    ss_orphan_count = 0

    QuestionResponseSet.all.each do |qrs|
      if qrs.question.nil? || qrs.response_set.nil?
        qrs.destroy!
        qrs_orphan_count += 1
      end
    end

    SectionQuestion.all.each do |sq|
      if sq.section.nil? || sq.question.nil?
        sq.destroy!
        sq_orphan_count += 1
      end
    end

    SurveySection.all.each do |ss|
      if ss.survey.nil? || ss.section.nil?
        ss.destroy!
        ss_orphan_count += 1
      end
    end

    puts "Cleaned up: #{qrs_orphan_count} QuestionResponseSets, #{sq_orphan_count} SectionQuestions and #{ss_orphan_count} SurveySections."
  end
end
