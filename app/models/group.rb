class Group < ApplicationRecord

  validates :name, presence: true

  has_many :group_users
  has_many :users, through: :group_users

  has_many :messages

  # グループを新規作成・更新したときに、アソシエーション先であるusersも含めて保存・更新できるようにする
  accepts_nested_attributes_for :users

end
