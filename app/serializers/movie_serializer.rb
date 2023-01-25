class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :date_released, :image_url
  belongs_to :user
  has_many :reviews
  has_many :users, through: :reviews
end
