import "./css/main.css"
import React from 'react'
import {
  render
} from 'react-dom'
import {
  createStore
} from 'redux'
import {
  Provider
} from 'react-redux'
import reducer from './reducer/index.js'
import App from './App.js'

let store = createStore(reducer)

render(
  <Provider store={store}>
      <App></App>
    </Provider>,
  document.getElementById('container')
)