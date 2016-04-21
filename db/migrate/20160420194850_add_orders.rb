class AddOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.belongs_to :user, null: false
      t.boolean :filled, default: false
    end
  end
end
