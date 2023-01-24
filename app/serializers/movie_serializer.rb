class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :date_released
  has_many :user
  has_many :review
end
