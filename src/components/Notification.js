import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const text = useSelector(state => state.message)
  return (
    <h2 id='notification'>
      {text}
    </h2>
  )
}

export default Notification
