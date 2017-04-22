class GroupsController < ApplicationController

  def new
    @group = Group.new
  end

  def create
    Group.create(group_params)
    redirect_to root_path
  end

  private
  def group_params
    # :user_idsは配列なので、書き方が↓のように特殊な形となる
    params.require(:group).permit(:name, :user_ids => [])
  end

end
