import axios from 'axios'

const api = {
  getTasks() {
    return axios.get('/tasks.json').then((res) => {
      return { data: res.data }
    })
  },
}

export default api
