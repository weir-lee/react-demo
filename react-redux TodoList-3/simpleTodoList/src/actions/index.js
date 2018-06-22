import * as actionTypes from '../constants/actionTypes.js'

export const addTodo = (text) => ({
  type: actionTypes.ADD_TODO,
  text
})