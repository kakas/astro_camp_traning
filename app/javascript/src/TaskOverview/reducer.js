import { TASK_OVERVIEW } from 'actionTypes'

const initialState = {
  tasks: [],
}

const taskOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_OVERVIEW.INIT_DATE.SUCCEED:
      return {
        ...state,
        tasks: action.tasks,
      }
    default:
      return state
  }
}

export default taskOverviewReducer
