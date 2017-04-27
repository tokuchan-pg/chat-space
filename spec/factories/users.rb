FactoryGirl.define do

  factory :user do
    id        "1"
    name      { Faker::Name.name }
    email     { Faker::Internet.email }
    password  { Faker::Internet.password }
  end

end
