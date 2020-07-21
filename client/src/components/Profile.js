import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signOutUser } from "../actions";

class Profile extends Component {
  render() {
    const { username, history } = this.props;
    console.log(username, history);
    return (
      <Fragment>
        <Typography variant="h6">
          <PersonIcon></PersonIcon>
          {username}
        </Typography>
        <Button color="inherit" onClick={() => this.props.signOutUser(history)}>
          <ExitToAppIcon></ExitToAppIcon>
        </Button>
      </Fragment>
    );
  }
}

export default connect(null, { signOutUser })(Profile);
