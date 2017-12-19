class FeedsController < ApplicationController
  before_action :require_logged_in!

  LIMIT = 5

  def show
    @feed_tweets =
      current_user.feed_tweets(LIMIT, params[:max_created_at]).includes(:user)

      respond_to do |format|
        format.html { render :show }
        format.html { render :show }
      end
  end
end