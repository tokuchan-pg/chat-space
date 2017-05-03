class GroupsController < ApplicationController

  before_action :set_group, only: [:edit, :update]

  def index; end

  def new
    @group = Group.new
    # 部分テンプレート「_group_form.html.haml」内で使用するダミー変数
    # groups#newがリクエストされた際は、空の配列を渡すことでエラーを防ぐ
    @users = []
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to group_messages_path(@group), notice: '新規グループが作成されました。'
    else
      flash.now.alert = 'グループ名を入力して下さい'
      render :new
    end
  end

  def edit
    # 部分テンプレート「_group_form.html.haml」内で使用する変数
    # groups#newがリクエストされた際に渡すことで、グループ編集画面にて、既に参加しているメンバーを始めから表示させる
    @users = @group.users.where.not(id: current_user.id)
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループが更新されました'
    else
      flash.now.alert = 'グループ名を入力して下さい'
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

  def set_group
    @group = Group.find(params[:id])
  end

end
