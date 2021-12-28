import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  userHandler,
  userVar,
  passwordHandler,
  passwordVar,
  submitHandler }) => {

  LoginForm.propTypes = {
    submitHandler : PropTypes.func.isRequired,
    userHandler : PropTypes.func.isRequired,
    passwordHandler : PropTypes.func.isRequired,
    userVar : PropTypes.func.isRequired,
    passwordVar : PropTypes.func.isRequired
  }
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
