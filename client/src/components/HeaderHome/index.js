import React from "react";

function HeaderHome() {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="client/src/images/burntpopkorn logo.png"
        alt="logo"
      />
      <button className="heading__button-signout">SIGN OUT</button>
    </div>
  );
}

export default HeaderHome;
