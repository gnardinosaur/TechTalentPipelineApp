class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.string :ticker
      t.integer :num_shares
      t.integer :price
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
