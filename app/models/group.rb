class Group < ApplicationRecord

  # グループ名が入力されていない時はテーブルにレコードを保存しない
  validates :name, presence: true

  has_many :group_users
  has_many :users, through: :group_users

  # グループを新規作成・更新したときに、アソシエーション先であるusersも含めて保存・更新できるようにする
  accepts_nested_attributes_for :users

end
