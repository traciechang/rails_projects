class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  def current_user
    return nil if session[:session_token].nil?
    @user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def require_log_in!
    return if current_user
    redirect_to new_session_url
  end

  def require_log_out!
    redirect_to subs_url if current_user
  end
end
