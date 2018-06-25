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
let store = createStore(reducer, applyMiddleware(logger, thunk))

render(
  <Provider store={store}>
      <App></App>
    </Provider>,
  document.getElementById('container')
)

// MainSection.js 
/**在这个组件中发送异步action，同样地，使用react-redux 的 connect 连接一下MainSection. 在该组件的props中自动就有dispatch了。
需要改写actionCreator函数，在action函数中发送异步请求之后再dispatch
*/

componentDidMount() {
    console.log('componentDidMount')
    this.props.dispatch(actions.asyncGetRemoteTodos())
}

export default connect(mapStateToProps, null)(MainSection)

```