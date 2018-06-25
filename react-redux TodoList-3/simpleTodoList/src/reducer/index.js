import * as actionTypes from '../constants/actionTypes.js'
let initState = {
  "todos": [],
  "filterType": 'SHOW_ALL'
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return { ...state,
        "todos": [{
          id: state.todos.reduce((maxId, item) => {
            return Math.max(maxId, item.id)
          }, -1) + 1,
          text: action.text,
          completed: false
        }, ...state.todos]
      }

      break;

    case actionTypes.COMPLETE_TODO:
      return { ...state,
        "todos": state.todos.map(todo => {
          if (todo.id === action.id) {
            return { ...todo,
              completed: action.completed
            }
          } else {
            return todo
          }
        })
      }

      break;

    case actionTypes.EDIT_TODO:
      return { ...state,
        "todos": state.todos.map(todo => {
          if (todo.id === action.id) {
            return {
              ...todo,
              text: action.text
            }
          } else {
            return todo
          }
        })
      }
      break;

    case actionTypes.CLEAR_ALL:
      return {
        ...state,
        "todos": []
      }
      break;

    case actionTypes.SET_FILTER_TYPE:
      return {
        ...state,
        filterType: action.filterType
      }
      break;

    default:
      return state
      break;
  }
}