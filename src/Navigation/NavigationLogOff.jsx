import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import Login from "../pages/Login";
import ForgotMyPassword from "../pages/ForgotMyPassword";

export default function Navigation() {
  return (
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
  );
}