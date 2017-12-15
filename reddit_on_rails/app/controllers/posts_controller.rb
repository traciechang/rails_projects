class PostsController < ApplicationController
    before_action :require_post_author!, only: [:edit, :update]
    before_action :require_log_in!

    def show
        @post = Post.find(params[:id])
        @post_comments_top_level = @post.comments.where(parent_comment_id: nil)
    end

    def new
        @post = Post.new
    end

    def create
        @post = current_user.posts.new(post_params)
        if @post.save
            redirect_to post_url(@post)
        else
            flash.now[:errors] = @post.errors.full_messages
        end
    end

    def edit
        @post = Post.find(params[:id])
    end

    def update
        @post = Post.find(params[:id])
        @post.update_attributes(post_params)
        if @post.save
            redirect_to post_url(@post)
        else
            flash.now[:errors] = @post.errors.full_messages
        end
    end

    private
    def post_params
        params.require(:post).permit(:title, :url, :content, sub_ids: [])
    end

    def require_post_author!
        return if current_user.posts.find_by(id: params[:id])
        render json: "Forbidden", status: :forbidden
    end
end
