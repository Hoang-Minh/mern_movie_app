import React from "react";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { signOutUser } from "../../actions";
import styles from "./Header.module.css";
import UnAuthHeader from "./UnAuthHeader";
import AuthHeader from "./AuthHeader";

class Header extends React.Component {
  renderAuthButton = () => {
    if (!this.props.username) return <UnAuthHeader></UnAuthHeader>;

    return <AuthHeader username={this.props.username}></AuthHeader>;
  };

  render() {
    return (
      <div className={styles.header}>
        <AppBar position="static" style={{ backgroundColor: "#538740" }}>
          <Toolbar id="back-to-top-anchor">
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

export default connect(null, { signOutUser })(Header);
