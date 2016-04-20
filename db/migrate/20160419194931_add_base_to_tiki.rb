class AddBaseToTiki < ActiveRecord::Migration
  def change
    add_column :tikis, :base, :boolean, default: false
  end
end
