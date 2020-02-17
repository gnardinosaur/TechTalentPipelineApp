Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do   
    namespace :v1 do
      resources :users, only: [:create, :index]
      post 'users/sign_in', to: 'users#sign_in'
      get 'stocks', to: 'stocks#fetch'
      resources :transactions
    end
  end
end
