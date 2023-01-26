class MoviesController < ApplicationController
  skip_before_action :authorize, only: :create
  wrap_parameters format: []


    def index
        render json: Movie.all
    end

     def show
        movie = Movie.find(params[:id])
        render json: user, status: :ok
    end

    def create
        movie = Movie.create!(movie_params)
        render json: movie, status: :created
    end

    def destroy
        movie = movie_find
        Review.where(movie_id:movie.id).destroy_all
        movie.destroy
        head :no_content
    end
    
   

    private

    def movie_find
        Movie.find(params[:id])
    end

    def movie_params
            params.permit(:title, :date_released, :image_url, :user_id)
    end
end
