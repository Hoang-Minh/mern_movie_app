import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Profile from "../Profile";

const AuthHeader = ({ username }) => {
  const history = useHistory();
  return (
    <Fragment>
      <Profile username={username} history={history}></Profile>
      <Button
        color="inherit"
        style={{ margin: "0 10rem" }}
        onClick={() => history.push("/fav_movies")}
      >
        Favorite
      </Button>
      <Button
        color="inherit"
        style={{ flexGrow: "0.3" }}
        onClick={() => history.push("/")}
      >
        Home
      </Button>
    </Fragment>
  );
};

export default AuthHeader;
