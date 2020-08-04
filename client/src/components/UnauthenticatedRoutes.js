import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function UnauthenticatedRoute({ children, ...rest }) {
  return (
    <Route {...rest}>{!rest.appProps ? children : <Redirect to="/" />}</Route>
  );
}
