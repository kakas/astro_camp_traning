import axios from 'axios'
import { take, all, call, put } from 'redux-saga/effects'
import { toCamelCaseKey } from 'utils'

const TASKS = {
  FETCH_TASKS: {
    REQUEST: 'TASKS.FETCH_TASKS.REQUEST',
    SUCCEED: 'TASKS.FETCH_TASKS.SUCCEED',
  },
}

// ========================
//        Reducer
// ========================
const initialState = {
  all: [],
  totalPages: 0,
}

export default function projectPageReducer(state = initialState, action) {
  switch (action.type) {
    case TASKS.FETCH_TASKS.SUCCEED:
      return {
        ...state,
        all: action.tasks,
        totalPages: action.totalPages,
      }
    default:
      return state
  }
}

// ========================
//           API
// ========================
const api = {
  getTasks(page) {
    return axios.get('/tasks.json', { params: { page } }).then((res) => {
      return { data: toCamelCaseKey(res.data) }
    })
  },
}

// ========================
//         Actions
// ========================
export function fetchTasks(page = 1) {
  return {
    type: TASKS.FETCH_TASKS.REQUEST,
    page,
  }
}

// ========================
//         Sagas
// ========================
function* fetchTasksFlow() {
  while (true) {
    const { page } = yield take(TASKS.FETCH_TASKS.REQUEST)
    const { data } = yield call(api.getTasks, page)
    const { tasks, totalPages } = data

    yield put({ type: TASKS.FETCH_TASKS.SUCCEED, tasks, totalPages })
  }
}

export function* sagas() {
  yield all([fetchTasksFlow()])
}
