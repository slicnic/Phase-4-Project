class MoviesController < ApplicationController

    def index
        render json: Movie.all
    end

     def show
        movie = Movie.find(params[:id])
        render json: user, status: :ok
    end
 def create
        movie = Movie.create!(movie_params)
        render json: review, status: :created
    end

    private

    def movie_params
            params.permit(:title, :date_released)
    end
end
