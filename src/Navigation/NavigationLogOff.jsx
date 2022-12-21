import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from "../pages/Login";
import ForgotMyPassword from "../pages/ForgotMyPassword";

export default function Navigation() {
  return (
    <Router basename="/site-treino">
      <div className="fullScreen">
        <Switch >
          <Route exact path="/" >
            <Login />
          </Route>
          <Route exact path="/forgotPassword">
            <ForgotMyPassword />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}