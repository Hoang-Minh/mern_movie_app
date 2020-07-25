import React, { Fragment, Component } from "react";
import { Grid, Typography, Button, Avatar, Divider } from "@material-ui/core";
import moment from "moment";

class Comment extends Component {
  render() {
    const {
      text,
      createdAt,
      author: { username },
    } = this.props.comment;

    return (
      <Fragment>
        <Grid container justify="flex-start" wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography variant="h6" style={{ margin: 0, textAlign: "left" }}>
              {username}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "left" }}>
              {text}
            </Typography>

            {this.props.loggedInUsername &&
              this.props.loggedInUsername === username && (
                <Button
                  size="small"
                  disableRipple={true}
                  onClick={() => this.props.onSubmit(this.props.comment)}
                >
                  Delete
                </Button>
              )}

            <Typography
              variant="body2"
              style={{ textAlign: "left", color: "gray", marginTop: "1rem" }}
            >
              posted {moment(createdAt).fromNow()}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "1rem 0" }} />
      </Fragment>
    );
  }
}

export default Comment;
