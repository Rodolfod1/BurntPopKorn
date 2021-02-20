import React from "react";
import logo from "../images/burntpopkorn logo.png";
import { Link } from "react-router-dom";

function HeaderSignIn() {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <button className="header__signinBtn">
        <Link className="header__signinBtnLink" to="/login">
          LOG IN
        </Link>
      </button>
    </div>
  );
}

export default HeaderSignIn;
