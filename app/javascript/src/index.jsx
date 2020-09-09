import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
import store from './store'
import 'semantic-ui-css/semantic.min.css'
import ProjectPage from './ProjectPage'

// setup csrf token
const csrfToken = document.querySelector('meta[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken

const Root = () => {
  return (
    <Provider store={store}>
      <ProjectPage />
    </Provider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.body.appendChild(document.createElement('div'))
  )
})
