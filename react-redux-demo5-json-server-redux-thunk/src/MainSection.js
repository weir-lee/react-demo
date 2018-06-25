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
import * as actions from './actions/index.js'


class MainSection extends React.Component {
  constructor({
    todos,
    filterType,
    dispatch
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

  componentDidMount() {
    console.log('componentDidMount')
    this.props.dispatch(actions.asyncGetRemoteTodos())
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