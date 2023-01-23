# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
 puts "Seeding!"
require 'faker'
Movie.destroy_all
# 20.times do
#     user = Faker::User.unique
# end

5.times do 
    User.create(name: Faker::Name.name, email: Faker::Internet.email, password_digest: "password")
end

20.times do 
    # title = Faker::Movie.unique.title
    Movie.create(title: Faker::Movie.unique.title, date_released: Faker::Date.forward(days: 1), user_id: User.all.sample.id)
end

25.times do 
    Review.create(rating: Faker::Number.within(range:1..10), content: Faker::Coffee.notes, user_id: User.all.sample.id, movie_id: Movie.all.sample.id)
end

puts "Done seeding!"