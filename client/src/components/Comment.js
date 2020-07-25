import React, { Fragment } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@material-ui/core";

const Comment = ({ comment }) => {
  const username = comment.author.username;
  const text = comment.text;
  console.log(username, text);
  return (
    <Fragment>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography variant="h6" style={{ margin: 0, textAlign: "left" }}>
            {username}
          </Typography>
          <Typography variant="body1" style={{ textAlign: "left" }}>
            {text}
          </Typography>
          <Typography
            variant="body2"
            style={{ textAlign: "left", color: "gray", marginTop: "1rem" }}
          >
            posted 1 minute ago
          </Typography>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "1rem 0" }} />
    </Fragment>
  );
};

export default Comment;
