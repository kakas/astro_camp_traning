# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks', type: :request do
  describe 'get all tasks' do
    it do
      tasks = create_list(:task, 2)
      get tasks_path, headers: { 'ACCEPT' => 'application/json' }
      expect(response).to have_http_status(:success)
      expect(response.body).to include(tasks[0].title)
      expect(response.body).to include(tasks[1].title)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe 'create task' do
    it do
      task_params = { task: attributes_for(:task) }
      expect { post tasks_path, params: task_params }.to change { Task.count }.by(1)
      expect(response).to have_http_status(:created)
      expect(response.body).to include(task_params[:task][:title])
    end
  end

  describe 'get task' do
    let(:task) { create(:task) }

    it do
      get task_path(task.id)
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['title']).to eq(task.title)
    end

    context 'when record not found' do
      it do
        get task_path(-1)
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'update task' do
    it do
      task = create(:task)
      task_params = { task: { title: 'new-title' } }
      expect { patch task_path(task.id), params: task_params }.to change { task.reload.title }.to('new-title')
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'destroy task' do
    it do
      task = create(:task)
      expect { delete task_path(task.id) }.to change { Task.count }.by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
