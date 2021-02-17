import React, { useContext } from "react";
import { AuthContext } from "./authentication/AuthContext";
import Home from "./pages/home";
import SignIn from './pages/signIn'
//import Profile from './pages/profile'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./utils/api";
import "./index.css";

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );
  console.log(user);
  console.log(isAuthenticated);
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
