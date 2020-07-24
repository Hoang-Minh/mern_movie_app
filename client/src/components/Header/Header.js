import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { signOutUser } from "../../actions";
import styles from "./Header.module.css";
import Profile from "../Profile";

class Header extends React.Component {
  renderAuthButton = () => {
    const { history } = this.props;

    if (this.props.auth && this.props.auth.username) {
      return (
        <Fragment>
          <Profile
            username={this.props.auth.username}
            history={history}
          ></Profile>
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
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button
            color="inherit"
            className={styles.home}
            onClick={() => history.push("/")}
          >
            Home
          </Button>
          <Button
            color="inherit"
            className={styles.home}
            onClick={() => history.push("/signin")}
          >
            Sign In
          </Button>
          <Button
            color="inherit"
            className={styles.home}
            onClick={() => history.push("/signup")}
          >
            Sign Up
          </Button>
        </Fragment>
      );
    }
  };

  render() {
    console.log("auth: ", this.props.auth);

    return (
      <div className={styles.header}>
        <AppBar position="static" style={{ backgroundColor: "#538740" }}>
          <Toolbar>
            <Typography variant="h6" className={styles.title}>
              Movies DB
            </Typography>

            {this.renderAuthButton()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signOutUser })(withRouter(Header));
