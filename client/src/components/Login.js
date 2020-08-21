import React, { useState } from "react";
import Axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  const [login, setLogin] = useState({
    credentials: {
      username: '',
      password: ''
    }
  })

  const handleLoginChanges = e => {
    setLogin({
      credentials: {
        ...login.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', login.credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload)
        //create route to BubblePage??
        
      })
      .catch(err => console.error('Failed:', err))
  }





  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleLoginSubmit}>
        <input
          type='text'
          name='username'
          value={login.credentials.username}
          onChange={handleLoginChanges}
        />
        <input
          type='password'
          name='password'
          value={login.credentials.password}
          onChange={handleLoginChanges}
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
