class Ability
  include CanCan::Ability

  def initialize(user)
    if user && user.admin?
      can :manage, :all
    elsif user && user.publisher?
      can :manage, [ResponseSet, Question, Section, Survey]
      can :manage, [ImportSession], created_by_id: user.id
      can :read, User
    elsif user
      can :manage, [ResponseSet, Question, Section, Survey], status: 'published'
      can :manage, [ResponseSet, Question, Section, Survey], status: 'draft', created_by_id: user.id
      can :manage, [ImportSession], created_by_id: user.id
      can :manage, [ResponseSet, Question, Section, Survey], status: 'draft', groups: { id: user.group_ids }
      can :read, User
    else
      can :read, [ResponseSet, Question, Section, Survey], status: 'published'
      can :redcap, [ResponseSet, Question, Section, Survey], status: 'published'
      can :epi_info, [Section, Survey], status: 'published'
      can :spreadsheet, [Survey], status: 'published'
      can :duplicate_count, [Survey], status: 'published'
      can :read, User
    end
  end
end
