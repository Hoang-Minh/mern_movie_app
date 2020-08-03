import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function UnauthenticatedRoute({ children, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth);
  return (
    <Route {...rest}>{!isAuthenticated ? children : <Redirect to="/" />}</Route>
  );
}
