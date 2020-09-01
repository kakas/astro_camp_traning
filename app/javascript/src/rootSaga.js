import { all, fork } from 'redux-saga/effects'
import * as tasks from './ducks/tasks'

export default function* rootSaga() {
  yield all([fork(tasks.sagas)])
}
