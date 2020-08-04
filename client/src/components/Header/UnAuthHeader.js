import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

function UnAuthHeader() {
  const history = useHistory();

  return (
    <div>
      <Fragment>
        <Button
          color="inherit"
          style={{ margin: "0 10rem" }}
          onClick={() => history.push("/")}
        >
          Home
        </Button>
        <Button
          color="inherit"
          style={{ marginRight: "10rem" }}
          onClick={() => history.push("/signin")}
        >
          Sign In
        </Button>
        <Button color="inherit" onClick={() => history.push("/signup")}>
          Sign Up
        </Button>
      </Fragment>
    </div>
  );
}

export default UnAuthHeader;
