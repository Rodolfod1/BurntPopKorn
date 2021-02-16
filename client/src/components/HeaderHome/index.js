import React from "react";
import logo from "../images/burntpopkorn logo.png";

function HeaderHome() {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <button className="heading__button-signout">SIGN OUT</button>
    </div>
  );
}

export default HeaderHome;
