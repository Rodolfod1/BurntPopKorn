import React from "react";
import { Link } from "react-router-dom";
import logo from "../components/images/burntpopkorn logo.png";
import "./login.css";

function LogIn() {
  return (
    <div className="login__container">
      <Link to="/">GO TO MAIN</Link>
      <div className="header">
        <img className="header__logo" src={logo} alt="logo" />
        <button className="heading__homeBtn">HOME</button>
        <div class="loginForm__section">
          <form className="loginForm" action="" method="POST">
            <label for="uname"></label>
            <input
              className="loginform__input"
              type="text"
              id="uname"
              name="uname"
              placeholder="Username"
            />
            <label for="password"></label>
            <input
              className="loginform__input"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <input className="loginform__button" type="submit" value="LOGIN" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
