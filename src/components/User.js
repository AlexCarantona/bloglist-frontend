import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const profile = useSelector(state =>
    state.users.find(u => u.id === id))
  return (
    <>
      <h2>{profile.name}</h2>
      <h3>Added blogs: </h3>
      <ul>
        {profile.blogs.map(ub =>
          <li key={ub.id}>
            <Link to={`/blogs/${ub.id}`}>
              {ub.title}
            </Link>
          </li>
        )}
      </ul>
    </>
  )
}

export default User
