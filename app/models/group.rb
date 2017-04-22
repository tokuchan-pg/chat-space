class Group < ApplicationRecord

  has_many :joins
  has_many :users, through: :joins

end
