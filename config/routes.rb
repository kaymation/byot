Rails.application.routes.draw do
  devise_for :users, :controllers => {
    sessions: 'sessions', registrations: 'registrations'
  }

  root 'homes#index'

  resources :tikis do
    collection do
      get 'bases'
      get 'heads'
      get 'edithead'
    end
  end

  get 'tikis/bases', to: 'tikis#bases'
  get 'tikis/heads', to: 'tikis#heads'
  get 'tikis/edithead', to:'tikis#edit_head'

  resources :orders, only: [:index, :new, :create, :destroy] do
    collection do
      get 'fill'
    end
  end

end
