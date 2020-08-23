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

  EDITABLE_COLUMNS = %i[title content status priority start_time end_time].freeze
  VIEWABLE_COLUMNS = [:id, *EDITABLE_COLUMNS].freeze
end
