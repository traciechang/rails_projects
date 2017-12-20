class FollowsController < ApplicationController
  before_action :require_logged_in!

  # we need current_user, which storeed already in session
  # we need send the user_id, which is in the URL
  def create
    # simulate latency
    sleep(1)

    @follow = current_user.out_follows.create!(followee_id: params[:user_id])

    respond_to do |format|
      format.html { redirect_to request.referrer }
      format.json { render :show }
    end
  end

  def destroy
    # simulate latency
    sleep(1)

    @follow = current_user.out_follows.find_by(followee_id: params[:user_id])
    @follow.destroy!

    respond_to do |format|
      format.html { redirect_to request.referrer }
      format.json { render :show }
    end
  end
end
