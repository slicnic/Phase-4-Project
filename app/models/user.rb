class User < ApplicationRecord

    has_many :reviews
    has_many :reviewed_movies, through: :reviews, source: :movie


    has_many :movies

    has_secure_password
end
