import * as actionTypes from '../constants/actionTypes.js'
let initState = [{
  id: 0,
  text: 'Hello React!',
  completed: false
}]

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [{
        id: state.reduce((maxId, item) => {
          return Math.max(maxId, item.id)
        }, -1) + 1,
        text: action.text,
        completed: false
      }, ...state]

      break

    default:
      return state

      break
  }
}