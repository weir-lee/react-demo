# 前期准备
  在做这个例子之前需要了解 react基础，对 react 的状态管理 state、props、context 有所了解。理解flux的基本概念：action、store、dispatch、subscribe，了解一下redux 、 react-redux。

# react的单向数据流中如何方便的传递数据
react 中数据是单向流动的，只能从父组件流向子组件，不能反向流动，这就意味着子组件不能直接改变父组件的state。父组件可以通过props把自己的state传递给子组件，并把改变state的方法也传递给子组件，但是实际应用中经常是多层组件嵌套的，如果从顶层组件一层一层的向下传递props代码不容易维护，写起来很麻烦。另外，当我们遇到多个组件共享一份数据的时候，该怎么维护呢？如果把公共数据写到一个相对顶级的组件state里面，然后通过props逐级往下传，前面提到这种做法真的很恶心。这个时候就需要一种机制来帮我们维护app中的数据。这个时候redux应运而生了。在使用redux之前，强烈建议看看flux的官网 https://github.com/facebook/flux ，学习下flux的思想，了解flux是如何管理数据、实现单向数据流动的，action、store、dispatch、subscribe如何联动。为了在react应用中方便的使用redux，react-redux应运而生，redux官网 https://github.com/reduxjs/redux，react-redux官网 https://github.com/reduxjs/react-redux。

# 基于 react react-redux redux 实现了计数器功能
redux 是基于flux思想的单向数据流的实现。react-redux 是封装了redux，应用于 react 的单向数据流的管理，使得 redux 在react 中使用起来更方便。在使用react-redux时全局只能有一个store。示例代码只有关键代码，完整代码请看src文件夹。

### 创建store, 处理数据   createStore(reducer)

    // reducer.js
    let initState = {
        total: 0
    }
    function reducer(state = initState, action) {
        switch(action.type) {
            case 'ADD':
                return {...state, total: state.total + 1};
                break;
            case 'MINUS':
                return {...state, total: state.total - 1};
                break;
            default:
                return state;
                break;
        }
    }

    // index.js
    import { createStore } from 'redux'
    let store = createStore(reducer)

 redux 提供了createStore 创建一个store。createStore 接收 reducer 参数生个一个store. reducer 封装了处理数据(store里面存的是数据)的具体逻辑，在reducer里面匹配了多个actionType，根据不同的action处理旧的数据(state)后返回新的数据(state)

### 在react组件中方便的读写store
react-redux 提供了一对兄弟 Provider、connect。Provider是一个顶层组件，store是它的属性，Provider里面的子组件都能方便的使用connect来获取store里面的数据，发出action命令去改变store里面的数据。需要使用store的组件App就connect()(App)一下就好了。
#### Provider用法
    // index.js
    import React from 'react'
    import { render } from 'react-dom'
    import { Provider } from 'react-redux'  // 关键

    render(
        <Provider store={store}>
            <App></App>
        </Provider>,  // 关键
        document.getElementById('container')
    )

#### connect用法
在需要使用store的子组件中将state和action connect到该组件的props.

    // App.js
    import * as actionCreators from './actionCreators.js'
    import dispatch from 'redux'
    import { connect } from 'react-redux'

    class App extends React.Component {
        render() {
            return (
                <div>
                    <h1>{this.props.total}</h1>
                    <button onClick={this.props.actions.add}>按我加1</button>
                </div>
            )
        }
    }

    /* 将store中的数据映射到组件的props，组件将通过props的total属性来接收store中state的total值*/
    function mapStateToProps(state) {
        return {
            total: state.total
        }
    }

    /* dispatch是用来发射action的，store接收到对应的action就用去调用
    reducer改变state。mapDispatchToProps的作用是把dispatch(action)映射
    到组件的props的，这样在组件中就可以通过props来发射改变state的命令了。
    在这里组件通过props.actions来接收所有的dispatch。
    需要注意的是props.actions下面的属性(key)是和actionCreators的函数名一致的，
    例如 this.props.actions.add 是正确的，但是 this.props.actions.ADD 就undefined了。
    */

    function mapDispatchToProps() {
        return {
            // 在这里actionCreators里面是函数，每个函数返回一个action
            actions: bindActionCreators(actionCreators, dispatch)
        }
    }

    // 子组件能够使用和改变store中的state,关键在这句
    export default connect(mapStateToProps, mapDispatchToProps)(App)   


    //actionCreators.js      生成action的函数
    export function add() {
        return {
            type: 'ADD'
        }
    }
    export function minus() {
        return {
            type: 'minus'
        }
    }




