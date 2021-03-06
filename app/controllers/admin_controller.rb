class AdminController < ApplicationController
  before_action :require_admin
  authorize_resource class: false

  def require_admin
    admin_flag = current_user && current_user.has_role?(:admin)
    render json: { msg: 'This action requires admin permissions, please refresh your application' }, status: :unauthorized unless admin_flag
  end
end
