import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function UnauthenticatedRoute({ children, ...rest }) {
  console.log(rest);
  return (
    <Route {...rest}>{!rest.appProp ? children : <Redirect to="/" />}</Route>
  );
}
