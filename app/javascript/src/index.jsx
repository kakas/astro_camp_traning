import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './Hello'

const Root = () => {
  return (
    <div>
      <Hello name="Kakas"></Hello>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root/>,
    document.body.appendChild(document.createElement('div')),
  )
})
