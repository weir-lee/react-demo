import React from 'react'
let classNames = require('classnames');
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import * as actions from './actions/index.js'

class VisibleListItem extends React.Component {
  constructor({
    item,
    actions
  }) {
    super()

    this.state = {
      editing: false
    }

    this.toggleItemCompleted = this.toggleItemCompleted.bind(this)
    this.getClassNames = this.getClassNames.bind(this)
    this.doubleClickHandler = this.doubleClickHandler.bind(this)
    this.submitEditItem = this.submitEditItem.bind(this)
    this.blurEditItem = this.blurEditItem.bind(this)
  }

  toggleItemCompleted(e) {
    let isChecked = e.target.checked
    let item = this.props.item
    this.props.actions.completeTodo(item.id, isChecked)
  }

  getClassNames(item) {
    let classname = ''
    if (item.completed) {
      classname = 'completed'
    }
    return classname
  }

  getItemChecked(item) {
    return item.completed ? true : false
  }

  doubleClickHandler() {
    let vm = this
    this.setState({
      editing: !vm.state.editing
    })
    this.refs.itemInput.value = this.props.item.text
    this.refs.itemInput.autofocus = 'true'
  }

  submitEditItem(e) {
    let newText = this.refs.itemInput.value.trim()
    if (e.keyCode === 13) {
      if (this.props.item.text.trim() !== newText) {
        this.props.actions.editTodo(this.props.item.id, newText)
      }
      this.setState({
        editing: false
      })
      // this.refs.itemInput.autofocus = 'false'
    }
  }

  blurEditItem() {
    let newText = this.refs.itemInput.value.trim()
    if (this.props.item.text.trim() !== newText) {
      this.props.actions.editTodo(this.props.item.id, newText)
    }
    this.setState({
      editing: false
    })
    // this.refs.itemInput.autofocus = 'false'
  }

  render() {
    let item = this.props.item
    let element

    element = (
      <li className={classNames({'completed': item.completed})}>
        <input type="checkbox" 
               onClick={this.toggleItemCompleted} 
               checked={this.getItemChecked(item)}/>

        <span onDoubleClick={this.doubleClickHandler} 
              className={classNames({'display-inline':!this.state.editing, "hide":this.state.editing})}>
              {item.id} {item.text}
        </span>

        <input type="text" 
               className={classNames({'display-inline':this.state.editing, 'hide':!this.state.editing})} 
               ref="itemInput"
               onKeyDown={this.submitEditItem} onBlur={this.blurEditItem}/>
      </li>
    )

    return element
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(VisibleListItem)