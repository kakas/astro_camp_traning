import axios from 'axios'
import { take, all, call, put } from 'redux-saga/effects'
import { toCamelCaseKey } from 'utils'
import { addFormErrors, openTaskFormModal } from './projectPage'

const TASKS = {
  FETCH_TASKS: {
    REQUEST: 'TASKS.FETCH_TASKS.REQUEST',
    SUCCEED: 'TASKS.FETCH_TASKS.SUCCEED',
  },
  UPDATE_TASK: {
    REQUEST: 'TASKS.UPDATE_TASK.REQUEST',
    SUCCEED: 'TASKS.UPDATE_TASK.SUCCEED',
  },
}

export const emptyTask = {
  title: '',
  content: '',
  status: '',
  priority: '',
  start_time: '',
  end_time: '',
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
    case TASKS.UPDATE_TASK.SUCCEED:
      return {
        ...state,
        all: state.all.map((task) =>
          task.id === action.task.id ? action.task : task
        ),
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
  updateTask(task) {
    return axios.patch(`/tasks/${task.id}`, { task }).catch((error) => {
      return { errors: error.response.data }
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

export function updateTask(task) {
  return {
    type: TASKS.UPDATE_TASK.REQUEST,
    task,
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

function* updateTaskFlow() {
  while (true) {
    const { task } = yield take(TASKS.UPDATE_TASK.REQUEST)
    const { errors } = yield call(api.updateTask, task)

    if (errors) {
      yield put(addFormErrors(errors))
    } else {
      yield put({ type: TASKS.UPDATE_TASK.SUCCEED, task })
      yield put(openTaskFormModal(false))
    }
  }
}

export function* sagas() {
  yield all([fetchTasksFlow(), updateTaskFlow()])
}
