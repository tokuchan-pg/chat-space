class Users::RegistrationsController < Devise::RegistrationsController

protected

#update_without_password：Deviseに実装されている、パスワードなしで更新を行うメソッド
#パスワードなしでユーザーのアカウント情報を更新できるようになる
#ただしパスワードの更新には現在のパスワードの入力が必要なので、↓のメソッドを使う
#update_without_current_password：models/user.rbに自分で定義したメソッド
#現在のパスワードの入力無しでもパスワードの更新をできるようにした

def update_resource(resource, params)
  resource.update_without_current_password(params)
end

end
