import React, { useContext } from "react";
import logo from "../images/burntpopkorn logo.png";
import { AuthService } from "../../authentication/AuthService";
import { AuthContext } from "../../authentication/AuthContext";
import { useHistory } from "react-router-dom";

function HeaderHome() {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    AuthService.logout().then(data => {
      if(data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        history.push('/login');
      }
    })
  }

  return (
    <div className="header__home">
      <img className="header__logo" src={logo} alt="logo" />
      <button onClick={handleLogout} className="heading__button-signout">LOG OUT</button>
    </div>
  );
}

export default HeaderHome;
