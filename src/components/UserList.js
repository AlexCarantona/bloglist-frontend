import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../reducers/openUsersReducer'


const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(allUsers())
  }, [])

  return (
    <>
      <h2>Users</h2>
      {users.map(u => <p
        key={u.username}
        className='openUser'
      >{u.username}: {u.blogs.length} blogs</p>)}
    </>
  )
}

export default UserList
