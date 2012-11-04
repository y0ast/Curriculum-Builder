class AddMajorTable < ActiveRecord::Migration
  def up
  	add_column :courses, :major_id, :integer
  	remove_column :courses, :major
  end

  def down
  	add_column :courses, :major, :integer
  	remove_column :courses, :major_id
  end
end
