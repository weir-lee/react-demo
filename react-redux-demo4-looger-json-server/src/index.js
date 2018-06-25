import "./css/main.css"
import React from 'react'
import {
  render
} from 'react-dom'
import {
  createStore,
  applyMiddleware
} from 'redux'
import {
  Provider
} from 'react-redux'
import logger from 'redux-logger'
import reducer from './reducer/index.js'
import App from './App.js'

let store = createStore(reducer, applyMiddleware(logger))

render(
  <Provider store={store}>
      <App></App>
    </Provider>,
  document.getElementById('container')
)