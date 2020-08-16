# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    title { 'task-title' }
    content { 'task-content' }
    status { :pending }
    priority { :normal }
    start_time { Time.zone.now }
    end_time { Time.zone.now }
  end
end
