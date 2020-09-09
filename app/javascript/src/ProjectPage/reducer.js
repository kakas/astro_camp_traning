import _ from 'lodash'
import { emptyTask, PROJECT_PAGE } from './constants'

const initialState = {
  tasks: [],
  totalPages: 0,
  editFormIsOpen: false,
  editFormIsLoading: false,
  taskFormData: { ...emptyTask },
  formErrors: {},
}

export default function projectPageReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_PAGE.FETCH_TASKS.SUCCEED:
      return {
        ...state,
        tasks: action.tasks,
        totalPages: action.totalPages,
      }
    case PROJECT_PAGE.CREATE_TASK.SUCCEED:
      return {
        ...state,
        tasks: [action.newTask, ...state.tasks],
      }
    case PROJECT_PAGE.UPDATE_TASK.SUCCEED:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.updatedTask.id ? action.updatedTask : task
        ),
      }
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

    case PROJECT_PAGE.SET_FORM_MODAL_IS_LOADING:
      return {
        ...state,
        editFormIsLoading: action.isLoading,
      }
    default:
      return state
  }
}
