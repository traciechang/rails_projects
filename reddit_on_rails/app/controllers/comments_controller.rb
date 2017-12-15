class CommentsController < ApplicationController
    before_action :require_log_in!

    def new
        @comment = Post.find(params[:post_id]).comments.new
    end
    
    def create
        @comment = current_user.comments.new(comment_params)
        if @comment.save
            redirect_to post_url(@comment.post_id)
        else
            flash.now[:errors] = @comment.errors.full_messages
        end
    end

    def show
        @comment = Comment.find(params[:id])
        @new_comment = current_user.comments.new
        @new_comment.parent_comment_id = params[:id]
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :parent_comment_id, :post_id)
    end
end
