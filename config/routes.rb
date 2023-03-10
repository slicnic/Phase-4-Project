Rails.application.routes.draw do

  resources :movies
  # , only: [:index, :show, :update, :create, :destroy]
  resources :reviews
  resources :users, only: [ :index, :show, :create]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  # patch "/movies" to: "movies#update"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
