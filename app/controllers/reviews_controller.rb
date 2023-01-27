class ReviewsController < ApplicationController
    wrap_parameters format: []

    def index
        render json: Review.all, status: :ok
    end

    def show
        review = Review.find(params[:id])
        render json: review, include: :user, status: :ok
    end

    def create
        review = Review.create!(production_params)
        render json: review, status: :created
    end

    def update
        review = Review.find(params[:id])
        review.update!(production_params)
        render json: review, status: :accepted
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    #Review strong params and why they are useful with updates
    def production_params
        params.permit(:rating, :content, :user_id, :movie_id)
    end

end

