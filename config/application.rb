require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    #コントローラー生成時に不要なファイルが作成されないように設定
    config.generators do |g|
      g.helper false
      g.test_framework false
    end

    #devise.ja.ymlをconfig/localesに直接追加する下準備として、
    #Railsアプリ自体のlocaleの設定を日本語に変更する
    config.i18n.default_locale = :ja

  end
end
