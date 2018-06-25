import $ from 'jquery'
import React from 'react'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import * as actionTypes from './constants/actionTypes.js'
import * as actions from './actions/index.js'

class Footer extends React.Component {
  constructor() {
    super()
    this.toggleFilterTypeHandler = this.toggleFilterTypeHandler.bind(this)
    this.clearAll = this.clearAll.bind(this)
  }

  toggleFilterTypeHandler(filterType) {
    return this.triggerToggleFilter.bind(this, filterType)
  }

  triggerToggleFilter(filterType, event) {
    this.props.actions.setFilterType(filterType)

    $('.footer .filter-btns button').removeClass('active')
    $(event.target).addClass('active')
  }

  countTodos() {
    return this.props.todos.length
  }

  countCompleted() {
    return this.props.todos.filter(item => {
      return item.completed
    }).length
  }

  countNotCompleted() {
    return this.countTodos() - this.countCompleted()
  }

  clearAll() {
    this.props.actions.clearAll()
  }

  render() {
    return (
      <div className="footer clearfix">
        <div className="pull-left">
          <button onClick={this.clearAll}>清空全部</button>
        </div>
        <div className="pull-right filter-btns">
          <span className="mr-10"><button onClick={this.toggleFilterTypeHandler(actionTypes.SHOW_ALL)} className="active">显示全部</button><span>{this.countTodos()}条</span></span>
          <span className="mr-10"><button onClick={this.toggleFilterTypeHandler(actionTypes.SHOW_COMPLETED)}>显示已完成</button><span>{this.countCompleted()}条</span></span>
          <button onClick={this.toggleFilterTypeHandler(actionTypes.SHOW_NOT_COMPLETED)}>显示未完成</button>{this.countNotCompleted()}条
        </div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

let mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)