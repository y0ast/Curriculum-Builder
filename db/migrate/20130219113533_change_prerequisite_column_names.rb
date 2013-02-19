class ChangePrerequisiteColumnNames < ActiveRecord::Migration
  def up
    rename_column :prerequisites, :prerequisite, :course_b_id
    rename_column :prerequisites, :course_id, :course_a_id
  end

  def down
    rename_column :prerequisites, :course_b_id, :prerequisite
    rename_column :prerequisites, :course_a_id, :course_id
  end
end
