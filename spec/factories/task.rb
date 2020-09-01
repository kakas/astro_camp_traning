# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    title { Faker::Lorem.word }
    content { Faker::Lorem.sentence }
    status { :pending }
    priority { :normal }
    start_time { Time.zone.now }
    end_time { 10.days.from_now }
  end
end
