import React from "react";
import logo from "../images/burntpopkorn logo.png";
import { Link } from "react-router-dom";

function HeaderSignIn() {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <Link className="header__signinBtn" to="/login">
        LOG IN
      </Link>
    </div>
  );
}

export default HeaderSignIn;
