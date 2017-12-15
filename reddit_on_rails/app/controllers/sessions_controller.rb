class SessionsController < ApplicationController
    def new
    end

    def create
        @user = User.find_by_credentials(params[:user][:name], params[:user][:password])

        if @user
            login!(@user)
            redirect_to subs_url
        else
            flash.now[:errors] = ["Invalid username or password"]
        end
    end

    def destroy
        current_user.reset_session_token!
        session[:session_token] = nil
        redirect_to new_session_url
    end
end
