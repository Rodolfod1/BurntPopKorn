import React, { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../authentication/AuthContext";
import { AuthService } from "../../authentication/AuthService";

function LoginForm() {
  const authContext = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const history = useHistory();

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsernameInput(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    if (!usernameRef.current.value || !passwordRef.current.value) {
      return setMessage("Please enter your username and password.");
    }

    AuthService.login(user).then((data) => {
      console.log(data);
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        history.push("/home");
      } else {
        setMessage("Username and password do not match.");
        setPasswordInput("");
        setUsernameInput("");
      }
    });
  };

  return (
    <div className="loginForm__main">
      <div class="loginForm__section">
        <h1 className="login__h1">Log In to Your Account</h1>
        <p className="login__p">
          Enter your username and password <br /> to log in to your account.
        </p>
        <form className="loginForm" onSubmit={onSubmit}>
          <label htmlFor="uname"></label>
          <input
            className="loginform__input"
            type="text"
            id="uname"
            name="uname"
            placeholder="Username"
            ref={usernameRef}
            value={usernameInput}
            onChange={handleUsernameChange}
          />

          <label htmlFor="password"></label>
          <input
            className="loginform__input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
            value={passwordInput}
            onChange={handlePasswordChange}
          />

          {/* Here is the Error Message!!!!!!!!!!!!!!!!! */}
          <div className="loginform__errorMessage">{message}</div>

          <input className="loginform__button" type="submit" value="LOG IN" />
        </form>
        <div className="loginform__createaccountsection">
          <p className="loginform__createaccountP">
            Don't have an account? Create one now!
          </p>
          <button className="loginform__createaccountBtn">
            <Link className="loginform__createaccountBtnLink" to="/">
              CREATE ACCOUNT
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
