class UsersController < ApplicationController
    before_action :require_log_out!, only: [:new, :create]

    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            redirect_to subs_url
        else
            flash[:errors] = @user.errors.full_messages
            redirect_to new_user_url
        end
    end

    private
    def user_params
        params.require(:user).permit(:name, :password)
    end
end
