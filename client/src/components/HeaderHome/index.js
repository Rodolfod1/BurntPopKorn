import React, { useContext } from "react";
import logo from "../images/burntpopkorn logo.png";
import { AuthService } from "../../authentication/AuthService";
import { AuthContext } from "../../authentication/AuthContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function HeaderHome() {
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
          <p className="header__greeting">Welcome, {user.username}!</p>
          <button className="header__button-activity">
            {" "}
            <Link className="header__activity-link" to="/stats">
              VIEW ACTIVITY
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

export default HeaderHome;
