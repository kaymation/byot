class RegistrationsController < Devise::RegistrationsController
  include ApplicationHelper
  # wrap_parameters :user
  respond_to :json

  def new
    render partial: 'signup'
  end

  def create
   resource = build_resource(sign_up_params)

   if resource.save
     if resource.active_for_authentication?
       set_flash_message :notice, :signed_up if is_navigational_format?
       sign_up(resource_name, resource)
       render :json => {:success => true, email: current_user.email }
     else
       set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
       expire_session_data_after_sign_in!
       render :json => {:success => true, email: current_user.email }
     end
   else
     clean_up_passwords resource
     render :json => { success: false, errors: resource.errors.full_messages}
   end
 end


end
