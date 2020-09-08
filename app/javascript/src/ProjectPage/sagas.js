import { take, all, call, put } from 'redux-saga/effects'
import { PROJECT_PAGE } from './constants'
import { addFormErrors, openTaskFormModal } from './actions'
import api from './api'

function* fetchTasksFlow() {
  while (true) {
    const { page } = yield take(PROJECT_PAGE.FETCH_TASKS.REQUEST)
    const { data } = yield call(api.getTasks, page)
    const { tasks, totalPages } = data

    yield put({ type: PROJECT_PAGE.FETCH_TASKS.SUCCEED, tasks, totalPages })
  }
}

function* updateTaskFlow() {
  while (true) {
    const { task } = yield take(PROJECT_PAGE.UPDATE_TASK.REQUEST)
    const { errors } = yield call(api.updateTask, task)

    if (errors) {
      yield put(addFormErrors(errors))
    } else {
      yield put({ type: PROJECT_PAGE.UPDATE_TASK.SUCCEED, task })
      yield put(openTaskFormModal(false))
    }
  }
}

export default function* sagas() {
  yield all([fetchTasksFlow(), updateTaskFlow()])
}
