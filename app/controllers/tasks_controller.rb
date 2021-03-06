# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :load_task, only: %i[show update destroy]

  def index
    respond_to do |format|
      format.html { render html: '', layout: true }
      format.json do
        tasks = Task.page(params['page']).per(10).select(Task::VIEWABLE_COLUMNS)
        render json: {
          tasks: tasks,
          total_pages: tasks.total_pages,
        }
      end
    end
  end

  def create
    @task = Task.create(task_params)

    if @task
      render json: @task.as_json(only: Task::VIEWABLE_COLUMNS), status: :created
    else
      render json: @task.errors
    end
  end

  def show
    render json: @task.as_json(only: Task::VIEWABLE_COLUMNS)
  end

  def update
    if @task.update(task_params)
      render json: @task, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def load_task
    @task = Task.find_by(id: params[:id])
    head :not_found unless @task
  end

  def task_params
    params.require(:task).permit(Task::EDITABLE_COLUMNS)
  end
end
