class User < ApplicationRecord
    # has_many :created_movies, class_name: 'Movie'

    has_many :reviews
    has_many :movies, through: :reviews

    has_secure_password
end
