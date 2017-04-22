class CreateJoins < ActiveRecord::Migration[5.0]
  def change
    create_table :joins do |t|
      t.references :group, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.timestamps
    end
  end
end
