import { TASK_OVERVIEW } from 'actionTypes'
import { select, take, all, call, put } from 'redux-saga/effects'
import api from './api'

function* initTasksFlow() {
  yield take(TASK_OVERVIEW.INIT_DATE.REQUEST)
  const { data, error } = yield call(api.getTasks)

  yield put({ type: TASK_OVERVIEW.INIT_DATE.SUCCEED, tasks: data })
}

export default function* () {
  yield all([initTasksFlow()])
}
