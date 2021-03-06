CarrierWave.configure do |config|
  config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['S3_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['S3_SECRET_ACCESS_KEY'],
      region: ENV['S3_REGION'],
  }

  config.fog_public = false

  case Rails.env
  when 'production'
    config.fog_directory = ENV['S3_BUCKET_NAME']
    config.storage :fog
  when 'development'
    config.fog_directory = ENV['S3_BUCKET_NAME_DEV']
    config.storage :fog
  when 'test'
    config.storage :file
  end

end
