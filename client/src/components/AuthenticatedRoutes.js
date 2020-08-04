import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ children, ...rest }) {
  return (
    <Route {...rest}>
      {rest.appProps ? children : <Redirect to={`/signin`} />}
    </Route>
  );
}
