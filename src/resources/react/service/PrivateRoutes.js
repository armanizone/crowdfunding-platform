import { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { loggedIn } from "./Auth";

function PrivateRoute({ children, ...rest }) {
  return (
  <Route
      {...rest}
      render={props =>
        loggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute