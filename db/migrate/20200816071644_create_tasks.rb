class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :content
      t.integer :status, default: 0, null: false
      t.integer :priority, default: 0, null: false
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps
    end
  end
end
