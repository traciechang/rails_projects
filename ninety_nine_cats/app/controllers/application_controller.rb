class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  def require_user!
    redirect_to new_session_url if current_user.nil?
  end
  
  def login!(user)
    user.reset_session_token!
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def require_no_user!
    if current_user
      redirect_to cats_url
    end
  end
end