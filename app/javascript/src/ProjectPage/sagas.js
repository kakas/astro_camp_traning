import { take, all, call, put } from 'redux-saga/effects'
import { PROJECT_PAGE } from './constants'
import {
  addFormErrors,
  openTaskFormModal,
  setTaskFormIsLoading,
} from './actions'
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
    yield put(setTaskFormIsLoading(true))
    const { errors } = yield call(api.updateTask, task)

    if (errors) {
      yield put(addFormErrors(errors))
    } else {
      yield put({ type: PROJECT_PAGE.UPDATE_TASK.SUCCEED, task })
      yield put(openTaskFormModal(false))
    }
    yield put(setTaskFormIsLoading(false))
  }
}

export default function* sagas() {
  yield all([fetchTasksFlow(), updateTaskFlow()])
}
