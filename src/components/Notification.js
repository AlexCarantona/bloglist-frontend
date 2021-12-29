import React from 'react'

const Notification = ({ content }) => {
  const { type, text } = content
  return (
    <h2 className={type} id='notification'>
      {text}
    </h2>
  )
}

export default Notification
