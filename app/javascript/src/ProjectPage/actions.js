import { PROJECT_PAGE } from 'actionTypes'

export function fetchTasks(page = 1) {
  return {
    type: PROJECT_PAGE.FETCH_TASKS.REQUEST,
    page,
  }
}
