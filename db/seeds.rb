# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Tiki.create([
  { name: "Angry Base", thumbnail_path: "angry_thumbnail.png", object_path: "assets/angry_base.x3d", height: 3.08445, base: true },
  { name: "Stoned Base", thumbnail_path: "stoned_thumbnail.png", object_path: "assets/stoned_base.x3d", height: 3.12001, base: true },
  { name: "Squinty Birdie", thumbnail_path: "squinty_thumbnail.png", object_path: "assets/squinty_birdie_best.x3d", height: 2.03743},
  { name: "Albert The Elf", thumbnail_path: "albert_thumbnail.png", object_path: "assets/albert_the_elf.x3d", height: 2.77706 },
  { name: "Mosquesus", thumbnail_path: "mosquesus_thumbnail.png", object_path: "assets/mosquesus.x3d", height: 2.68382 }
  ])
