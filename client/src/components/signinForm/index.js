import React, { useState, useContext, useRef } from "react";
import { AuthService } from '../../authentication/AuthService';
import { AuthContext } from '../../authentication/AuthContext';

function SignInForm(props) {
  const authContext = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
    if (!usernameRef.current.value) {
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return;
    }
    AuthService.register({username: usernameRef.current.value, password: passwordRef.current.value})
    .then(data => {
      console.log(data);
    })
  }


  return (
    <div className="main">
      <div className="main__div">
        <h1 className="main__h1">
          Because there's nothing worse than terrible movies...
        </h1>
        <h1>except for maybe burnt popcorn.</h1>
        <p className="main__p">
          Ready to get started? Create your account now.
        </p>

        <form className="form" onSubmit={onSubmit}>
          <label htmlFor="uname"></label>
          <input
            className="form__input"
            type="text"
            id="uname"
            name="uname"
            placeholder="Username"
            ref={usernameRef}
          />
          <label htmlFor="password"></label>
          <input
            className="form__input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <label htmlFor="confirmPassword"></label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            name="conformPassword"
            placeholder="Confirm password"
            ref={confirmPasswordRef}
          />
          <input
            className="form__button"
            type="submit"
            value="CREATE ACCOUNT"
          />
        </form>

      </div>
    </div>
  );
}

export default SignInForm;
