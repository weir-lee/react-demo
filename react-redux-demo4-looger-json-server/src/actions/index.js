import * as actionTypes from '../constants/actionTypes.js'

export const addTodo = (text) => ({
  type: actionTypes.ADD_TODO,
  text
})

export const completeTodo = (id, completed) => ({
  type: actionTypes.COMPLETE_TODO,
  id,
  completed
})

export const editTodo = (id, text) => ({
  type: actionTypes.EDIT_TODO,
  id,
  text
})

export const clearAll = () => ({
  type: actionTypes.CLEAR_ALL
})

export const setFilterType = (filterType) => ({
  type: actionTypes.SET_FILTER_TYPE,
  filterType
})