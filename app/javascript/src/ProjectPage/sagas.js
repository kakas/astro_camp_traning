import { PROJECT_PAGE } from 'actionTypes'
import { take, all, call, put } from 'redux-saga/effects'
import api from './api'

function* fetchTasksFlow() {
  while (true) {
    const { page } = yield take(PROJECT_PAGE.FETCH_TASKS.REQUEST)
    const { data } = yield call(api.getTasks, page)
    const { tasks, totalPages } = data

    yield put({ type: PROJECT_PAGE.FETCH_TASKS.SUCCEED, tasks, totalPages })
  }
}

export default function* projectPageSagas() {
  yield all([fetchTasksFlow()])
}
