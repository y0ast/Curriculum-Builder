# == Schema Information
#
# Table name: courses
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  coursecode  :string(255)
#  description :string(255)
#  teacher     :string(255)
#  major       :string(255)
#  track       :string(255)
#  level       :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Course < ActiveRecord::Base
	belongs_to :period
	belongs_to :major
	attr_accessible :coursecode, :description, :level, :major, :name, :teacher, :track, :period

	validates :name, presence: true

	def self.search(search)
	  if search
	    where('name ILIKE ?', "%#{search}%").includes(:major, :period)
	  else
	    scoped
	  end
	end
end
