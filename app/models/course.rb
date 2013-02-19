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
  has_and_belongs_to_many(:prerequisites,
                          :join_table => "prerequisites",
                          :foreign_key => "course_a_id",
                          :association_foreign_key => "course_b_id",
                          :class_name => "Course")

  attr_accessible :coursecode, :description, :level, :major_id, :name, :teacher, :track, :period_id, :prerequisites, :prerequisite_ids
  validates :name, presence: true
  validates :teacher, presence: true


  def self.search(search)
    if search
      where('name ILIKE ?', "%#{search}%").includes(:major, :period)
    else
      scoped
    end
  end
end
