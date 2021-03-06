class SessionsController < Devise::SessionsController
  include ApplicationHelper
  skip_before_filter :verify_authenticity_token
  clear_respond_to
  respond_to :json

  def new
    render partial: 'login'
  end

  def create
    resource = User.find_for_database_authentication(email: params[:user][:email])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user][:password])
      sign_in :user, resource
      return render json: { success: true,
        email: current_user.email,
        tikicount: current_user.pole_count,
        admin: current_user.admin? }
    end

    invalid_login_attempt
   end

   protected

   def invalid_login_attempt
      set_flash_message(:alert, :invalid)
      render json: flash[:alert], status: 401
    end


end
