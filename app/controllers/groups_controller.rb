class GroupsController < ApplicationController

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      flash.notice = '新規グループが作成されました。'
      redirect_to root_path
    else
      # flashは「アクション->リダイレクト->アクション」の処理が済まないとメッセージが削除されないので、
      # renderと併用すると、ページを回遊してもメッセージが残ってしまう。
      # →flash.nowを使う
      flash.now.alert = 'グループ名を入力して下さい'
      render action: 'new'
    end
  end

  private
  def group_params
    # ログインユーザーのidを、collection_check_boxes経由で送られてきた配列user_idsに、文字列型で追加する
    params.require(:group)[:user_ids].push(current_user.id.to_s)
    # :user_idsは配列なので、書き方が↓のように特殊な形となる
    return params.require(:group).permit(:name, :user_ids => [])
  end

end
