import { TASK_OVERVIEW } from 'actionTypes'

const initialState = {
  tasks: [],
  totalPages: 0,
}

const taskOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_OVERVIEW.INIT_DATE.SUCCEED:
      return {
        ...state,
        tasks: action.tasks,
        totalPages: action.totalPages,
      }
    default:
      return state
  }
}

export default taskOverviewReducer
