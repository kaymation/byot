class AddAddressFieldToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :street_address, :string
    add_column :orders, :zip, :integer
  end
end
