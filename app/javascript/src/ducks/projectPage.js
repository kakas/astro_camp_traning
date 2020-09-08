import _ from 'lodash'
import { emptyTask } from './tasks'

const PROJECT_PAGE = {
  OPEN_FORM_MODAL: 'PROJECT_PAGE.OPEN_FORM_MODAL',
  UPDATE_TASK_FORM_DATA: 'PROJECT_PAGE.UPDATE_TASK_FORM_DATA',
  ADD_FORM_ERRORS: 'PROJECT_PAGE.ADD_FORM_ERRORS',
  CLEAR_FORM_FIELD_ERRORS: 'PROJECT_PAGE.CLEAR_FORM_FIELD_ERRORS',
}

// ========================
//        Reducer
// ========================
const initialState = {
  editFormIsOpen: false,
  taskFormData: { ...emptyTask },
  formErrors: {},
}

export default function projectPageReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_PAGE.OPEN_FORM_MODAL:
      return {
        ...state,
        editFormIsOpen: action.isOpen,
      }

    case PROJECT_PAGE.UPDATE_TASK_FORM_DATA:
      return {
        ...state,
        taskFormData: action.data,
      }

    case PROJECT_PAGE.ADD_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.errors,
      }

    case PROJECT_PAGE.CLEAR_FORM_FIELD_ERRORS:
      return {
        ...state,
        formErrors: _.omit(state.formErrors, [action.field]),
      }

    default:
      return state
  }
}

// ========================
//         Actions
// ========================
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
