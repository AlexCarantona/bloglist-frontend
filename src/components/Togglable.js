import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false);

  const visibleState = { display: visible ? '' : 'none'};
  const invisibleState = { display: visible ? 'none' : ''}

  const toggle = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggle }
  })

  return(
    <div>
      <div style={invisibleState}>
        <button onClick={toggle}> {props.buttonLabel}</button>
      </div>
      <div style={visibleState}>
        {props.children}
        <button onClick={toggle}>Cancel</button>
      </div>
    </div>
  )

})

export default Togglable;
