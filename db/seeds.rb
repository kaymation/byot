# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Tiki.create([
  { name: "Angry Base", thumbnail_path: "nil.png", object_path: "assets/angry_base.x3d", height: 3.08445 },
  { name: "Stoned Base", thumbnail_path: "nil.png", object_path: "assets/stoned_base.x3d", height: 3.12001},
  { name: "Squinty Birdie", thumbnail_path: "nil.png", object_path: "assets/squinty_birdie_best.x3d", height: 2.03743}
  ])
