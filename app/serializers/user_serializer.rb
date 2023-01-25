class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :image_url, :bio
  # attributes :id, :name, :email, :password_digest
  has_many :movies
  has_many :reviews
end
