class OrderTiki < ActiveRecord::Base
  belongs_to :tiki
  belongs_to :order
end
