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

require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
