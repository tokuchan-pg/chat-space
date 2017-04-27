FactoryGirl.define do

  factory :user do
    id        "1"
    name      { Faker::Name.name }
    email     { Faker::Internet.email }
    password  { Faker::Internet.password }
  end

  factory :message do
    body      "test_body"
    image     "test_imgae"
    group_id  "1"
    user_id   "1"
  end

  factory :group do
    name      { Faker::Name.name }
  end

end
