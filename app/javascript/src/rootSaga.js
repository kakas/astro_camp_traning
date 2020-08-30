import { all, fork } from 'redux-saga/effects'
import taskOverviewSagas from 'TaskOverview/sagas'

export default function* rootSaga() {
  yield all([fork(taskOverviewSagas)])
}
