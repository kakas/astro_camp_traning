# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'validate #end_date_should_after_start_date' do
    subject(:task) { build(:task, start_time: start_time, end_time: end_time) }

    context 'when start_date is blank' do
      let(:start_time) { nil }
    end

    context 'when end_date is blank' do
      let(:end_time) { nil }
    end

    context 'when start_date and end_date both exists' do
      context 'when start_date greater then end_date' do
        let(:start_time) { Time.zone.now }
        let(:end_time) { start_time - 1.second }

        it do
          expect(task.valid?).to eq(false)
          expect(task.errors.messages[:start_time]).to include('start time should less than end time')
        end
      end

      context 'when start_date equal to end_date' do
        let(:start_time) { Time.zone.now }
        let(:end_time) { start_time }

        it do
          expect(task.valid?).to eq(false)
          expect(task.errors.messages[:start_time]).to include('start time should less than end time')
        end
      end

      context 'when start_date less then end_date' do
        let(:start_time) { Time.zone.now }
        let(:end_time) { start_time + 1.second }

        it do
          expect(task.valid?).to eq(true)
        end
      end
    end
  end
end
