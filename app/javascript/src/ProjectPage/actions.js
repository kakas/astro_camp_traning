import { PROJECT_PAGE } from './constants'

export function fetchTasks(page = 1) {
  return {
    type: PROJECT_PAGE.FETCH_TASKS.REQUEST,
    page,
  }
}

export function createTask(task) {
  return {
    type: PROJECT_PAGE.CREATE_TASK.REQUEST,
    task,
  }
}

export function updateTask(task) {
  return {
    type: PROJECT_PAGE.UPDATE_TASK.REQUEST,
    task,
  }
}

export function openTaskFormModal(isOpen) {
  return {
    type: PROJECT_PAGE.OPEN_FORM_MODAL,
    isOpen,
  }
}

export function updateTaskFormData(data) {
  return {
    type: PROJECT_PAGE.UPDATE_TASK_FORM_DATA,
    data,
  }
}

export function addFormErrors(errors) {
  return {
    type: PROJECT_PAGE.ADD_FORM_ERRORS,
    errors,
  }
}

export function clearFormFieldErrors(field) {
  return {
    type: PROJECT_PAGE.CLEAR_FORM_FIELD_ERRORS,
    field,
  }
}

export function setTaskFormIsLoading(isLoading) {
  return {
    type: PROJECT_PAGE.SET_FORM_MODAL_IS_LOADING,
    isLoading,
  }
}
