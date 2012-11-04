class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :name
      t.string :coursecode
      t.string :description
      t.string :teacher
      t.string :major
      t.string :track
      t.integer :level

      t.timestamps
    end
  end
end
