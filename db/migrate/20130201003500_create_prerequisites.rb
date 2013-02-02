class CreatePrerequisites < ActiveRecord::Migration
  def change
    create_table :prerequisites, :force => true, :id => false do |t|
      t.references :course, :null => false
      t.integer :prerequisite, :null => false
    end
  end
end
