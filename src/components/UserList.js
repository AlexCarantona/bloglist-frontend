import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../reducers/openUsersReducer'
import { Link, Outlet } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(allUsers())
  }, [])

  return (
    <>
      <h2>Users</h2>
      {users.map(u =>
        <p key={users.indexOf(u)}>
          <Link
            className='openUser'
            to={u.id}
          >
            {u.username}: {u.blogs.length} blogs
          </Link>
        </p>
      )}
      <Outlet />
    </>
  )
}

export default UserList
