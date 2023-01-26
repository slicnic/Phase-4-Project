# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
 
require 'faker'
puts "Destroying"
Review.destroy_all
Movie.destroy_all
User.destroy_all

puts "Seeding!"

puts "Creating User"
User.create(username:"admin13", bio:"n", image_url:"n", password:"123")

286.times do
    User.create(username: Faker::Name.name, bio: Faker::Internet.email, image_url: "sdfg", password_digest: "password")
end

puts "Seeding Movies"
30.times do
    # title = Faker::Movie.unique.title
    Movie.create(title: Faker::Movie.unique.title, date_released: Faker::Date.forward(days: 1), image_url: Faker::LoremFlickr.image(size: "500x300"), user_id: User.all.sample.id)
end
puts "Seeding Reviews"

# puts User.all.sample.id
# puts Movie.all.sample.id

100.times do
    Review.create(rating: Faker::Number.within(range:1..10), content: Faker::Coffee.notes, user_id: User.all.sample.id, movie_id: Movie.all.sample.id)
end

# puts Movie.first.image_url

puts "Done seeding!"