class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :cash
end