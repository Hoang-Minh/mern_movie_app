import React, { Fragment } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import styles from "./Header.module.css";
import Profile from "../Profile";

const AuthHeader = ({ username, history }) => {
  const renderAuthButton = () => {
    return (
      <Fragment>
        <Profile username={username} history={history}></Profile>
        <Button
          color="inherit"
          className={styles.home}
          onClick={() => console.log("fav movies")}
        >
          Favorite
        </Button>
        <Button
          color="inherit"
          className={styles.home}
          onClick={() => console.log("home")}
        >
          Home
        </Button>
      </Fragment>
    );
  };

  return (
    <div className={styles.header}>
      <AppBar position="static" style={{ backgroundColor: "#538740" }}>
        <Toolbar id="back-to-top-anchor">
          <Typography variant="h6" className={styles.title}>
            Movies DB
          </Typography>
          {renderAuthButton()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AuthHeader;
