Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:show, :new, :create, :index]
  resource :session, only: [:new, :create, :destroy]
  resources :goals
  resources :comments, only: [:create]
end
