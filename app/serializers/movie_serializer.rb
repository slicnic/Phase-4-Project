class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :date_released, :image_url
  has_many :user
  has_many :review
end
