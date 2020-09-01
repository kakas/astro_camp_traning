# frozen_string_literal: true

class Task < ApplicationRecord
  # -------------------------- Constants ---------------------------------
  EDITABLE_COLUMNS = %i[title content status priority start_time end_time].freeze
  VIEWABLE_COLUMNS = [:id, *EDITABLE_COLUMNS].freeze

  # -------------------------- Attributes --------------------------------
  # -------------------------- Associations ------------------------------
  # -------------------------- Validations -------------------------------
  validate :end_date_should_after_start_date

  # -------------------------- Scopes ------------------------------------
  # -------------------------- Callbacks ---------------------------------
  # -------------------------- Others ------------------------------------
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

  # -------------------------- Class Methods -----------------------------
  # -------------------------- Instance Methods --------------------------

  private

  def end_date_should_after_start_date
    # 同時有值才需要驗證
    return if start_time.nil? || end_time.nil?

    errors.add(:start_time, 'start time should less than end time') if start_time >= end_time
  end
end
