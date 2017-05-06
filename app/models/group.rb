class Group < ApplicationRecord

  validates :name, presence: true

  has_many :group_users
  has_many :users, through: :group_users

  has_many :messages

  def show_lastest_message
    (messages.last)? messages.last.body : 'まだメッセージはありません'
  end

end
