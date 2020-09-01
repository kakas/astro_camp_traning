import { all, fork } from 'redux-saga/effects'
import projectPageSagas from 'ProjectPage/sagas'

export default function* rootSaga() {
  yield all([fork(projectPageSagas)])
}
