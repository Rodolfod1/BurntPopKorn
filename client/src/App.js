import React, { useContext } from "react";
import { AuthContext } from "./authentication/AuthContext";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import LogIn from "./pages/login";
import Stats from "./pages/stats";
import Reviews from "./pages/reviews";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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
            {!isAuthenticated ? <SignIn /> : <Redirect to="/home" />}
          </Route>

          <Route exact path="/home">
            {isAuthenticated ? <Home /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/login">
            {!isAuthenticated ? <LogIn /> : <Redirect to="/home" />}
          </Route>

          <Route exact path="/stats">
            {isAuthenticated ? <Stats /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/reviews">
            {isAuthenticated ? <Reviews /> : <Redirect to="/login" />}
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
