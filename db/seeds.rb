# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

["SCI", "SSC", "HUM"].each do |major|
  Major.find_or_create_by_name(major)
end

["fall", "spring", "intensive-fall", "intensive-spring", "fall spring", "intensive-fall intensive-spring"].each do |period|
  Period.find_or_create_by_name(major)
end

