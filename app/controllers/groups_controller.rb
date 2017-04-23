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
    # ログインユーザーのidを、collection_check_boxes経由で送られてきた配列user_idsに、文字列型で追加する
    params.require(:group)[:user_ids].push(current_user.id.to_s)
    # :user_idsは配列なので、書き方が↓のように特殊な形となる
    return params.require(:group).permit(:name, :user_ids => [])
  end

end
