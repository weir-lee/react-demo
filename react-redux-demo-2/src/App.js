import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { dispatch, bindActionCreators } from 'redux'
import * as actionCreators from './actionCreators.js'

class App extends React.Component {
    constructor(props) {
        super()
        this.addAnyNumber = this.addAnyNumber.bind(this)
    }

    addAnyNumber() {
        let number = Number(this.refs.numInput.value.trim())
        if (isNaN(number)) return;
        this.props.actions.addNum(number)
    }

    render() {
        return (
            <div>
              <h1>计算结果：{this.props.sum}</h1> 
              <button onClick={this.props.actions.add}> 点我加1 </button>
              <button onClick={this.props.actions.minus}> 点我减1 </button> 
              <input type="text" placeholder="输入增加的数字" ref="numInput" />
              <button onClick={this.addAnyNumber}>点我任意加</button>
            </div>
        )
    }
}

export default connect(function mapStateToProps(state) {
    return {
        sum: state.total
    }
}, function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    }
})(App)