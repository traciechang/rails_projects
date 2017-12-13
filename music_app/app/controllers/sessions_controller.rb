class SessionsController < ApplicationController
    def new
    end

    def create
        user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if user
            login!(user)
            redirect_to user_url(user)
        else
            render json: user.errors.full_messages
        end
    end

    def destroy
        logout!
        redirect_to new_session_url
    end
end