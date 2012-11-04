class AddPeriodIdToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :period_id, :integer
  end
end
