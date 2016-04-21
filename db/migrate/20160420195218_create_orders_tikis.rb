class CreateOrdersTikis < ActiveRecord::Migration
  def change
    create_table :order_tikis do |t|
      t.belongs_to :order, null: false
      t.belongs_to :tiki, null: false
      t.integer :position
    end
  end
end
