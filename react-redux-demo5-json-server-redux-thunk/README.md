# redux中间件

## json-server模拟后台接口
实际开发中往往是前后台同事开发的，前端在开发调试时需要模拟后台接口，json-server是一个模拟restful接口的利器，短短几行代码就可以搭建一个服务。
github官网：https://github.com/typicode/json-server
```
npm i --save-dev json-server

// npm scripts
json-server --watch ./moco/db.json --static ./moco/public --port 9000
```


## 发送异步Action的中间件redux-thunk
#### 例子：请求远程数据初始化本地数据
主要代码
```
// index.js
    import React from 'react'
    import {
      render
    } from 'react-dom'
    import {
      createStore,
      applyMiddleware
    } from 'redux'
    import {
      Provider
    } from 'react-redux'
    import logger from 'redux-logger'
    import thunk from 'redux-thunk'  // 引入redux-thunk
    import reducer from './reducer/index.js'
    import App from './App.js'

    // applyMiddleware(thunk)
    // 初始化store的时候注入中间件thunk
    let store = createStore(reducer, applyMiddleware(logger, thunk))

    render(
      <Provider store={store}>
          <App></App>
        </Provider>,
      document.getElementById('container')
    )

// MainSection.js 
    /**在这个组件中发送异步action，同样地，使用react-redux 的 connect 连接一下MainSection. 在该组件的props中自动就有dispatch了。
    需要改写actionCreator函数，在action函数中进行异步操作之后再dispatch。

    注意：1. 使用redux-thunk进行发送异步action，会自动往组件的props对象注入dispatch属性，通过这个dispatch调用异步action。
    2.仍然需要connect组件，并且connect的第二个参数不需要，否则props中就没有dispatch了
    */

    componentDidMount() {
        console.log('componentDidMount')
        // props.dispatch调用异步action
        this.props.dispatch(actions.asyncGetRemoteTodos()) 
    }
    export default connect(mapStateToProps, null)(MainSection)


// actions.js
    // 改写action函数
    /* 引入中间件redux-thunk, connect组件，这时候组件的props中自动注入了dispatch，在需要触发异步action的地方 this.props.dispatch(actions.asyncGetRemoteTodos()) 
    在asyncGetRemoteTodos这个action里面写异步操作，这个action是一个函数，执行这个函数会返回一个自动注入dispatch的函数。可以用redux-logger打印日志查看。
    */

    export const asyncGetRemoteTodos = () => {
      return (dispatch, getState) => {
        $.ajax({
          type: 'get',
          url: 'http://localhost:9000/getTodos'
        }).done((res) => {
          dispatch(initTodos(res.todos))
        }).fail()
      }
    }

// reducer.js
    // reducer不需要变化
    case actionTypes.INIT_TODOS:
      return { ...state,
        todos: action.todos
      };
      break;
```

总结：
1. 异步action的实现：
    a. 在createStore时注入thunk中间件。
    b. 需要发送异步action的组件仍然需要connect，之后，组件的props就自动注入了dispatch函数，但是不能传connect的第二个参数，传了以后props的dispatch就注入不进去了。通过 组件.dispatch(action()) 调用异步action。同步的action也可以这样调用，但是action不需要像异步那要去写，像以前那样 action() 的时候返回一个json对象{type: 'xxx'}。
    c. 异步action的写法：action() 返回一个函数，这个函数自动注入了 dispatch, getState 两个参数，在这个函数里面写上异步代码。
    d. reducer 和 视图是看不见同步、异步的，异步被封装在action里面。

