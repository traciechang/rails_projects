class GoalsController < ApplicationController
    before_action :require_current_user!

    def index
        @goals = current_user.goals
    end

    def show
        @goal = Goal.find(params[:id])
    end

    def new
        @goal = Goal.new
    end

    def create
        @goal = current_user.goals.new(goal_params)
        if @goal.save
            redirect_to goal_url(@goal)
        else
            flash.now[:errors] = @goal.errors.full_messages
        end
    end

    def edit
        @goal = Goal.find(params[:id])
    end

    def update
        @goal = Goal.find(params[:id])
        @goal.update_attributes(goal_params)
        if @goal.save
            redirect_to goal_url(@goal)
        else
            flash.now[:errors] = @goal.errors.full_messages
        end
    end

    def destroy
        @goal = Goal.find(params[:id])
        @goal.destroy
        redirect_to goals_url
    end

    private
    def goal_params
        params.require(:goal).permit(:title, :details, :private, :completed)
    end
end
