import { createStore, applyMiddleware, combineReducers } from './redux.js'

import { studyPersonReducer, playfulPersonReducer, booksReducer } from './reducers.js'

import { setStudyPerson, setPlayfulPerson, setBook } from './actions.js'

let rootReducer = combineReducers({
  studyPerson: studyPersonReducer,
  playfulPerson: playfulPersonReducer,
  books: booksReducer,
})


// 中间件1
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('previous state:', store.getState())
  next(action)
  console.log('next state:', store.getState())
  console.log('action:', action)
}

// 中间件2
const updateTimeMiddleware = (store) => (next) => (action) => {
  console.log('state change time:', new Date().toLocaleString())
  next(action)
}

// 中间件3
const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action)
  } catch (e) {
    console.log('错误信息：', e)
  }
}

const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, updateTimeMiddleware, loggerMiddleware)

let { getState, dispatch, subscribe } = createStore(rootReducer, rewriteCreateStoreFunc)

//设置图书馆拥有的图书
dispatch(setBook([
  {
    id: 1,
    name: 'javascript高级程序设计',
    kind: '计算机编程',
  },
  {
    id: 2,
    name: '图解css3',
    kind: '计算机编程',
  },
  {
    id: 3,
    name: 'javascript函数式编程',
    kind: '计算机编程',
  },
  {
    id: 4,
    name: '三国演义',
    kind: '小说',
  },
  {
    id: 5,
    name: '篮球投篮技巧',
    kind: '运动类',
  },
]))

//设置学习者信息
dispatch(setStudyPerson({
  name: '混沌传奇',
  age: 25,
  like: ['学习计算机知识', '打羽毛球'],
  sex: '男',
  readedBooks: [1, 2, 3],
}))

//设置爱玩者信息
dispatch(setPlayfulPerson({
  name: '阿龙',
  age: 28,
  like: ['看综艺', '看小说', '看杂志'],
  sex: '男',
  readedBooks: [4, 5],
}))
