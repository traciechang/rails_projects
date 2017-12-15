class SubsController < ApplicationController
    before_action :user_owns_sub!, only: [:edit, :update]
    before_action :require_log_in!, only: [:new, :create, :show]

    def new
        @sub = Sub.new
    end

    def create
        @sub = current_user.subs.new(sub_params)

        if @sub.save
            redirect_to sub_url(@sub)
        else
            flash.now[:errors] = @sub.errors.full_messages
        end
    end

    def edit
        @sub = Sub.find(params[:id])
    end

    def update
        @sub = Sub.find(params[:id])
        @sub.update_attributes(sub_params)
        if @sub.save
            redirect_to sub_url(@sub)
        else
            flash.now[:errors] = @sub.errors.full_messages
        end
    end

    def index
        @subs = Sub.all
    end

    def show
        @sub = Sub.find(params[:id])
    end

    private
    def sub_params
        params.require(:sub).permit(:title, :description)
    end

    def user_owns_sub!
        return if current_user.subs.find_by(id: params[:id])
        render json: 'Forbidden', status: :forbidden
    end
end
