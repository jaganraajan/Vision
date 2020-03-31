import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import Dashboard from '../dashboard/Dashboard';

// import NotFound from "../layout/NotFound";
// import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <section className="landing2">
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        
      </Switch>
    </section>
  );
};

export default Routes;
