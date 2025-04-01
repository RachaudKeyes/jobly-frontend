import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existent route redirects to the homepage.
 */

function Routes({ login, signup }) {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `signup=${typeof signup}`
    );

    return (
        <div className="Routes">
          <Switch>

            <Route exact path="/">
              <Homepage />
            </Route>

            <PrivateRoute exact path="/companies">
              <CompanyList />
            </PrivateRoute>

            <PrivateRoute exact path="/companies/:handle">
              <CompanyDetail />
            </PrivateRoute>

            <PrivateRoute exact path="/jobs">
              <JobList />
            </PrivateRoute>

            <Route exact path="/login">
              <LoginForm login={ login } />
            </Route>

            <Route exact path="/signup">
              <SignupForm signup = { signup } />
            </Route>

            <PrivateRoute exact path="/profile">
              <ProfileForm />
            </PrivateRoute>

            <Redirect to="/" />

          </Switch>
        </div>
    );
}

export default Routes;