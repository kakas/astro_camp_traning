# frozen_string_literal: true

class Task < ApplicationRecord
  enum status: {
    pending: 0,
    in_progress: 1,
    done: 2,
  }
  enum priority: {
    normal: 0,
    high: 1,
    low: 2,
  }
end
