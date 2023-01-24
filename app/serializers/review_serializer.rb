class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :review
  has_many :users
end
