import React from 'react';

function Login() {
  return (
    <form>
      <input type='text' placeholder='Name' />
      <input type='email' placeholder='Email' />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default Login;
