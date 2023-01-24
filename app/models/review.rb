class Review < ApplicationRecord
    belongs_to :user
    belongs_to :movie

    validates :rating, inclusion: :1..10
end
