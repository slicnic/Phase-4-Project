class MoviesController < ApplicationController
  skip_before_action :authorize, only: :create
  wrap_parameters format: []


    def index
        render json: Movie.all
    end

     def show
        movie = Movie.find(params[:id])
        render json: movie, status: :ok
    end
 def create
        movie = Movie.create!(movie_params)
        render json: movie, status: :created
    end

    def update
        movie = Movie.find(params[:id])
        movie.update!(movie_params)
        render json: movie, status: :accepted
    end

     def destroy
        movie = Movie.find(params[:id])
        Review.where(movie_id:movie.id).destroy_all
        movie.destroy
        head :no_content
    end

    private

    def movie_params
            params.permit(:title, :date_released, :image_url, :user_id)
    end
end
