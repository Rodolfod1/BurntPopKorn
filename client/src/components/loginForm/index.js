import React, { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from '../../authentication/AuthContext';
import { AuthService } from "../../authentication/AuthService";

function LoginForm() {
  const authContext = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState(null);
  const history = useHistory();

  const onSubmit = e => {
    e.preventDefault();
    const user = {username: usernameRef.current.value, password: passwordRef.current.value}

    AuthService.login(user)
    .then(data => {
      console.log(data)
      const { isAuthenticated, user, message } = data;
      if(isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        history.push('/');
        
      } else {
        setMessage(message)
      }
    })
  }



  return (

    <div class="loginForm__section">
        <form className="loginForm" onSubmit={onSubmit}>
        
        <label htmlFor="uname"></label>
        <input
            className="loginform__input"
            type="text"
            id="uname"
            name="uname"
            placeholder="Username"
            ref={usernameRef}
        />


        <label htmlFor="password"></label>
        <input
            className="loginform__input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
        />
        <input className="loginform__button" type="submit" value="LOGIN" />
        </form>
    </div>
  );
}

export default LoginForm;
