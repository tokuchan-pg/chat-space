json.name @message.user.name
# Railsのデフォルトの時刻表示形式に合わせる
json.created_at l(@message.created_at, format: :custom)
json.body @message.body
json.image_url @message.image.url
