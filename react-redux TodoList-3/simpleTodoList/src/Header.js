import React from 'react'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import * as actions from './actions/index.js'

class Header extends React.Component {
  constructor() {
    super()
    this.onAddTodo = (this.onAddTodo).bind(this)
  }

  onAddTodo(e) {
    let target = e.target
    if (e.keyCode === 13) {
      let text = target.value.trim()
      if (text !== '') {
        this.props.actions.addTodo(text)
        e.target.value = ''
      }
    }

  }

  render() {
    return (
      <div>
        <input onKeyDown={this.onAddTodo} placeholder="请输入代办事项，回车"/>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Header)