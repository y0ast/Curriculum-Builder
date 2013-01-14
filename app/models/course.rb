# == Schema Information
#
# Table name: courses
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  coursecode  :string(255)
#  description :string(255)
#  teacher     :string(255)
#  track       :string(255)
#  level       :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  period_id   :integer
#  major_id    :integer
#

class Course < ActiveRecord::Base
	belongs_to :period
	belongs_to :major
	attr_accessible :coursecode, :description, :level, :major_id, :name, :teacher, :track, :period_id

	validates :name, presence: true
	validates :coursecode, :format => { :with => /[0-9]+/, :message => "Only numbers Allowed"}
	validates :description, presence: true
	validates :teacher, presence: true
	validates :level, :length => {:is => 3}

	def self.search(search)
	  if search
	    where('name ILIKE ?', "%#{search}%").includes(:major, :period)
	  else
	    scoped
	  end
	end
end
