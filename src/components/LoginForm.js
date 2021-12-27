import React from 'react';

const LoginForm = ({
  userHandler,
  userVar,
  passwordHandler,
  passwordVar,
  submitHandler }) => {
  return (
    <form onSubmit={submitHandler}>

      <label htmlFor='loginUsername'>Username</label>
      <input
        type='text'
        id='loginUsername'
        onChange={userHandler}
        value={userVar}
        />

      <label htmlFor='loginPassword'>Password</label>
      <input
        type='password'
        id='loginPassword'
        onChange={passwordHandler}
        value={passwordVar}
        />
    <button type='submit'>Login</button>
    </form>
  )
};

export default LoginForm;
