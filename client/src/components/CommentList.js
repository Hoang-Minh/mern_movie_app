import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
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

class CommentList extends Component {
  renderComments = () => {
    return this.props.comments.map((comment, key) => (
      <Comment key={key} comment={comment}></Comment>
    ));
  };

  render() {
    console.log(this.props.comments);

    return <div style={{ clear: "right" }}>{this.renderComments()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};

export default connect(mapStateToProps)(CommentList);
