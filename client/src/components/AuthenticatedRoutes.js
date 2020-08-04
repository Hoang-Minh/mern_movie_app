import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ children, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth);
  console.log("is Authenticated", isAuthenticated);
  return (
    <Route {...rest}>
      {isAuthenticated ? children : <Redirect to={`/signin`} />}
    </Route>
  );
}
