# frozen_string_literal: true

RSpec.configure do |config|
  config.before(:suite) do
    Timecop.freeze(Time.zone.parse('2018/7/3 0:12:54+0000'))
    Timecop.safe_mode = true
  end

  config.after(:suite) do
    Timecop.return
  end
end
