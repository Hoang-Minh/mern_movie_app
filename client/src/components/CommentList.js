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
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  console.log("CommentList", comments.length);
  const renderList = () => {
    return comments.length > 0 && <Comment></Comment>;
  };
  return <div style={{ clear: "right" }}>{renderList()}</div>;
};

export default CommentList;
