import axios from 'axios'
import { toCamelCaseKey } from 'utils'

const api = {
  getTasks(page) {
    return axios.get('/tasks.json', { params: { page } }).then((res) => {
      return { data: toCamelCaseKey(res.data) }
    })
  },
  createTask(formData) {
    return axios
      .post('/tasks', { task: formData })
      .then((res) => {
        return { data: res.data }
      })
      .catch((error) => {
        return { errors: error.response.data }
      })
  },
  updateTask(formData) {
    return axios
      .patch(`/tasks/${formData.id}`, { task: formData })
      .catch((error) => {
        return { errors: error.response.data }
      })
  },
}

export default api
