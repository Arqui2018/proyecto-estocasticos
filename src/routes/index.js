import React from "react";
import {  BrowserRouter as Router,  Route,  Switch,  Redirect } from "react-router-dom";
import Login from '../components/login';
import Matchedate from '../components/matchedate';
import Bet from '../components/bet';
import Profile from '../components/profile';
import Hint from '../components/hint';
import { TOKEN } from "../variables"
import 'semantic-ui-css/semantic.min.css';
import '../css/main.css';

const Logout = () => {
  localStorage.removeItem(TOKEN);
  return <Redirect to="/login" />;
}

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Matchedate} />
      <Route path="/login" exact component={Login} />
      <Route path="/bet" exact component={Bet} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/hint" exact component={Hint} />
    </Switch>
  </Router>
);
