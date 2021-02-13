import Home from './pages/home'
//import SignIn from './pages/signIn'
//import Profile from './pages/profile'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './utils/api';

function App() {
  return (
    <Router>
    <div>
    <Route exact path="/">
    <Home />
    </Route>
    </div>
    </Router>
  );
}

export default App;
