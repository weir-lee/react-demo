# redux中间件

## 打印redux日志  redux-logger
这个中间件太棒了，疯狂笔芯，疯狂点赞！
github官网：https://github.com/evgenyrodionov/redux-logger
阮一峰博客：http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html

利用redux的中间件 createLogger，发出action的时候在控制台打印出action 和 state，方便调试。
// index.js
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import reducer from './reducer/index.js'
import App from './App.js'

let store = createStore(reducer, applyMiddleware(logger))
const store = createStore(
  reducer,
  applyMiddleware(logger)
);

## 发送异步Action的中间件redux-thunk
