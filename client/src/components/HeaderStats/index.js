import React, { useContext } from "react";
import logo from "../images/burntpopkorn logo.png";
import { AuthService } from "../../authentication/AuthService";
import { AuthContext } from "../../authentication/AuthContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function HeaderStats() {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        history.push("/login");
      }
    });
  };

  return (
    <>
      <div className="header__home">
        <img className="header__logo" src={logo} alt="logo" />
        <div className="header__greetingAndBtn">
          <button className="header__button-activity">
            <Link className="header__activity-link" to="/home">
              HOME
            </Link>
          </button>
          <button onClick={handleLogout} className="header__button-signout">
            LOG OUT
          </button>
        </div>
      </div>
    </>
  );
}

export default HeaderStats;
