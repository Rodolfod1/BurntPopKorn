import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../authentication/AuthService";
import { AuthContext } from "../../authentication/AuthContext";

function SignInForm(props) {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [alertMessage, setAlertMessage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!usernameRef.current.value) {
      setAlertMessage("Please enter a username and password");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setAlertMessage("Password fields do not match");
      return;
    }
    AuthService.register({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }).then((data) => {
      console.log(data);
      if (data.message.msgError) {
        setAlertMessage(data.message.msgBody);
      } else {
        history.push("/login");
      }
    });
  };

  return (
    <div className="main">
      <div className="main__div">
        <h1 className="main__h1">
          Because there's nothing worse than terrible movies...
          <br />
          <br />
          except for maybe burnt popcorn.
        </h1>
        <p className="main__p">
          Ready to get started? Create your account now.
        </p>

        <form className="form" onSubmit={onSubmit}>
          <label htmlFor="uname"></label>

          {/* This div is the alert that pops up and tells the user if they didn't complete the form,
          if their passwords don't match, or if their username is already taken
          It needs to be styled to look scary and intimidating */}
          <div className="alertMessage">{alertMessage}</div>

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
