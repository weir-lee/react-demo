import React from 'react'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators,
  dispatch
} from 'redux'
import * as actions from './actions/index.js'

class MainSection extends React.Component {
  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props.todos)}</p>
        <ul>
          {
            this.props.todos.map((todo) => {
                return <li>{todo.text}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSection)