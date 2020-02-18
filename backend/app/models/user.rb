class User < ApplicationRecord
  has_many :transactions
  validates :name, uniqueness: true
  validates :name, :email, :password, presence: true
end

