import React from 'react'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators,
  dispatch
} from 'redux'
import VisibleListItem from './VisibleListItem'
import * as actionTypes from './constants/actionTypes.js'

class MainSection extends React.Component {
  constructor({
    todos,
    filterType
  }) {
    super()
  }

  filterTodos() {
    let props = this.props

    switch (props.filterType) {
      case actionTypes.SHOW_ALL:
        return props.todos;
        break;

      case actionTypes.SHOW_COMPLETED:
        return props.todos.filter(todo => {
          return todo.completed
        });
        break;

      case actionTypes.SHOW_NOT_COMPLETED:
        return props.todos.filter(todo => {
          return !todo.completed
        });
        break;

      default:
        return props.todos;
        break;
    }
    props.todos.filter(todo)
  }

  render() {
    let todoList = this.filterTodos()

    return (
      <div>
        <ul class="todolist">
          {
            todoList.map((todo) => {
                return <VisibleListItem item={todo} />
            })
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    filterType: state.filterType
  }
}

export default connect(mapStateToProps, null)(MainSection)