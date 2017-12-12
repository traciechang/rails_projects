class CommentsController < ApplicationController
    def create
        @comment = Comment.new(comment_params)
        @comment.author_id = current_user.id
        if @comment.save
            flash[:notices] = ['Comment saved!']
            redirect_to user_url(@comment.author_id)
        else
            flash[:errors] = @comment.errors.full_messages
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:commentable_id, :commentable_type, :body)
    end
end
