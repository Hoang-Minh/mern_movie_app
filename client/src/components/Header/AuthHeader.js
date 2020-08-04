import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import styles from "./Header.module.css";
import Profile from "../Profile";

const AuthHeader = ({ username }) => {
  const history = useHistory();
  return (
    <div className={styles.header}>
      <AppBar position="static" style={{ backgroundColor: "#538740" }}>
        <Toolbar id="back-to-top-anchor">
          <Typography variant="h6" className={styles.title}>
            Movies DB
          </Typography>
          <Profile username={username} history={history}></Profile>
          <Button
            color="inherit"
            className={styles.home}
            onClick={() => history.push("/fav_movies")}
          >
            Favorite
          </Button>
          <Button
            color="inherit"
            className={styles.home}
            onClick={() => history.push("/")}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AuthHeader;
