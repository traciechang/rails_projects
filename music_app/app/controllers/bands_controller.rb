class BandsController < ApplicationController
    before_action :require_user!

    def index
        @bands = Band.all
        render :index
    end

    def new
        @band = Band.new
    end

    def create
        band = Band.new(band_params)
        if band.save
            redirect_to bands_url
        else
            render json: band.errors.full_messages
        end
    end

    def edit
        @band = Band.find(params[:id])
    end

    def update
        @band = Band.find(params[:id])
        @band.update_attributes(band_params)
        if @band.save
            redirect_to band_url(@band)
        else
            render json: @band.errors.full_messages
        end
    end

    def show
        @band = Band.find(params[:id])
    end

    def destroy
        @band = Band.find(params[:id])
        @band.destroy
        redirect_to bands_url
    end

    private
    def band_params
        params.require(:band).permit(:name)
    end
end
