import { TASK_OVERVIEW } from 'actionTypes'

export function initTasks(page = 1) {
  return {
    type: TASK_OVERVIEW.INIT_DATE.REQUEST,
    page,
  }
}
