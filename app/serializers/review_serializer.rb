class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :content
  belongs_to :user
end
