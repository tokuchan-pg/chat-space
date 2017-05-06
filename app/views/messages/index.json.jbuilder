json.(@messages_add) do |messages_add|
  json.name messages_add.user.name
  # Railsのデフォルトの時刻表示形式に合わせる
  json.created_at l(messages_add.created_at, format: :custom)
  json.body messages_add.body
  json.image_url messages_add.image.url
  json.id messages_add.id
end
