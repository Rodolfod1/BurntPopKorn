import React from "react";
import logo from "../images/burntpopkorn logo.png";

function HeaderSignIn() {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <button className="header__signinBtn">SIGN IN</button>
    </div>
  );
}

export default HeaderSignIn;
