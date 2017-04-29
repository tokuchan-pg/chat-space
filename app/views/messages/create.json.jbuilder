json.name @message.user.name
# Railsのデフォルトの時刻表示形式に合わせる
json.created_at @message.created_at.strftime("%Y-%m-%d %H:%M:%S UTC")
json.body @message.body
