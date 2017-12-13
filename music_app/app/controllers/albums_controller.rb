class AlbumsController < ApplicationController
    before_action :require_user!

    def new
        @band = Band.find(params[:band_id])
        @album = Album.new(band_id: params[:band_id])
    end

    def create
        @album = Album.new(album_params)
        if @album.save
            album_url(@album)
            redirect_to album_url(@album)
        else
            flash.now[:errors] = @album.errors.full_messages
        end
    end

    def edit
        @album = Album.find(params[:id])
    end

    def update
        @album = Album.find(params[:id])
        @album.update_attributes(album_params)
        if @album.save
            redirect_to album_url(@album)
        else
            flash.now[:errors] = @album.errors.full_messages
        end
    end

    def show
        @album = Album.find(params[:id])
    end

    def destroy
        @album = Album.find(params[:id])
        @album.destroy
        redirect_to band_url(@album.band_id)
    end

    private
    def album_params
        params.require(:album).permit(:band_id, :live, :title, :year)
    end
end
