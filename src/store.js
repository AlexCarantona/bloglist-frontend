import { createStore, applyMiddleware, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import openUsersReducer from './reducers/openUsersReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
  users: openUsersReducer
})

const store = createStore(
  reducer,
  applyMiddleware(
    thunk
  )
)

export default store
