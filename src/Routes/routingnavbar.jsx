import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Aboutweb from "../Components/aboutweb"
import GetAllPosts from '../Components/posts.jsx';
import Login from '../Pages/login'

export default function NavbarRoute() {
  return (
    <Router>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/">
            <GetAllPosts />
          </Route>
          <Route path="/about">
            <Aboutweb />
          </Route>
          <Route path="/login">
          <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
  