class TracksController < ApplicationController
    before_action :require_user!

    def new
        @track = Track.new(album_id: params[:album_id])
    end

    def create
        @track = Track.new(track_params)
        if @track.save
            redirect_to track_url(@track)
        else
            flash.now[:errors] = @track.errors.full_messages
        end
    end

    def edit
        @track = Track.find(params[:id])
    end

    def show
        @track = Track.find(params[:id])
    end

    def update
        @track = Track.find(params[:id])
        @track.update_attributes(track_params)
        if @track.save
            redirect_to track_url(@track)
        else
            flash.now[:errors] = @track.errors.full_messages
        end
    end

    def destroy
        @track = Track.find(params[:id])
        @track.destroy
        redirect_to album_url(@track.album_id)
    end

    private
    def track_params
        params.require(:track).permit(:title, :ord, :lyrics, :bonus, :album_id)
    end
end
