import { PROJECT_PAGE } from 'actionTypes'

const initialState = {
  tasks: [],
  totalPages: 0,
}

const projectPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_PAGE.FETCH_TASKS.SUCCEED:
      return {
        ...state,
        tasks: action.tasks,
        totalPages: action.totalPages,
      }
    default:
      return state
  }
}

export default projectPageReducer
