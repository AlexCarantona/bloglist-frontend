import { createStore, applyMiddleware, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(
    thunk
  )
)

export default store
