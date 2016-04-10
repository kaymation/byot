class CreateTikis < ActiveRecord::Migration
  def change
    create_table :tikis do |t|
      t.string :name, null: false
      t.string :object_path, null: false
      t.string :thumbnail_path, null: false
      t.float :height, null: false
    end
  end
end
