class UsersController < ApplicationController
    before_action :require_no_user!, only: [:new, :create]

    def show
        @user = User.find(params[:id])
        @user_comments = @user.comments
        @user_goals = @user.goals.from("goals").where("goals.private = 'false' AND goals.user_id = ?", params[:id])
    end

    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            redirect_to user_url(@user)
        else
            flash.now[:errors] = @user.errors.full_messages
        end
    end

    def index
        @users = User.all
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :cheer_count)
    end
end
