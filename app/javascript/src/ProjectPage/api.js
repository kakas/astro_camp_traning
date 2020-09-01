import axios from 'axios'
import { toCamelCaseKey } from 'utils'

const api = {
  getTasks(page) {
    return axios.get('/tasks.json', { params: { page } }).then((res) => {
      return { data: toCamelCaseKey(res.data) }
    })
  },
}

export default api
