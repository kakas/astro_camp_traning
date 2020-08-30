import { TASK_OVERVIEW } from 'actionTypes'
import { take, all, call, put } from 'redux-saga/effects'
import api from './api'

function* initTasksFlow() {
  const { page } = yield take(TASK_OVERVIEW.INIT_DATE.REQUEST)
  const { data } = yield call(api.getTasks, page)
  const { tasks, totalPages } = data

  yield put({ type: TASK_OVERVIEW.INIT_DATE.SUCCEED, tasks, totalPages })
}

export default function* taskOverviewSagas() {
  yield all([initTasksFlow()])
}
