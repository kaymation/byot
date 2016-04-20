Rails.application.routes.draw do
  devise_for :users, :controllers => {
    sessions: 'sessions', registrations: 'registrations'
  }

  root 'homes#index'

  get 'tikis/bases', to: 'tikis#bases'
  get 'tikis/heads', to: 'tikis#heads'

end
