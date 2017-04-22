class Group < ApplicationRecord

  has_many :joins
  has_many :users, through: :joins

  # グループを新規作成・更新したときに、アソシエーション先であるusersも含めて保存・更新できるようにする
  accepts_nested_attributes_for :users

end
