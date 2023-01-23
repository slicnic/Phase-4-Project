class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :date_released
  has_one :user
  has_one :review
end
