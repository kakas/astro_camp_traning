import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import 'semantic-ui-css/semantic.min.css'
import ProjectPage from './ProjectPage'

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
