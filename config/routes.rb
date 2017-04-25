Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :groups, except: [:show, :destroy] do
    resources :messages, only: [:index, :create]
  end

  root 'messages#index'
end
