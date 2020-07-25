import React, { Fragment } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";

const Comment = ({ comment }) => {
  const username = comment.author.username;
  const text = comment.text;
  console.log(username, text);
  return (
    <Fragment>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary={username} secondary={text} />
        </ListItem>
      </List>
    </Fragment>
  );
};

export default Comment;
