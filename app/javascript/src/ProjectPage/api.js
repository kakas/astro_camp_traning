import axios from 'axios'
import { toCamelCaseKey } from 'utils'

const api = {
  getTasks(page) {
    return axios.get('/tasks.json', { params: { page } }).then((res) => {
      return { data: toCamelCaseKey(res.data) }
    })
  },
  createTask(task) {
    return axios
      .post('/tasks', { task })
      .then((res) => {
        return { data: res.data }
      })
      .catch((error) => {
        return { errors: error.response.data }
      })
  },
  updateTask(task) {
    return axios.patch(`/tasks/${task.id}`, { task }).catch((error) => {
      return { errors: error.response.data }
    })
  },
}

export default api
