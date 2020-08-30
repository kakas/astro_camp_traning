def create_tasks
  time_range = 10.days.ago..10.days.from_now
  tasks = 200.times.map do
    start_time = Time.now + rand(-100..100).days
    end_time = start_time + rand(100).days
    Task.new(
      title: Faker::Lorem.word,
      content: Faker::Lorem.paragraph,
      status: Task.statuses.keys.sample,
      priority: Task.priorities.keys.sample,
      start_time: start_time,
      end_time: end_time,
    )
  end
  Task.import tasks
end
