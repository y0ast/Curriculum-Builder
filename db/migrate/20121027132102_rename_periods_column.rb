class RenamePeriodsColumn < ActiveRecord::Migration
  def up
  	rename_column :periods, :period, :offered_in
  end

  def down
  	rename_column :periods, :offered_in, :period
  end
end
