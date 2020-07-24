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

const Comment = () => {
  return (
    <Fragment>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Minh Nguyen"
            secondary="I'll be in your neighborhood doing errands this…"
          />
        </ListItem>
      </List>
    </Fragment>
  );
};

export default Comment;
