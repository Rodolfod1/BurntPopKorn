import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

function LogIn() {
  return (
    <div className="login__container">
      <Link to="/">GO TO MAIN</Link>
      <div className="header">
        <img className="header__logo" src={logo} alt="logo" />
        <button className="heading__homeBtn">HOME</button>
      </div>
    </div>
  );
}

export default LogIn;
