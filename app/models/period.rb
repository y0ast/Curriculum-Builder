# == Schema Information
#
# Table name: periods
#
#  id         :integer          not null, primary key
#  offered_in :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Period < ActiveRecord::Base
  attr_accessible :period
end
