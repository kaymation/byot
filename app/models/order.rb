class Order < ActiveRecord::Base
  has_many :order_tikis
  has_many :tikis, through: :order_tikis
  belongs_to :user

end
