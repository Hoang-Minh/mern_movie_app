import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { List, Typography, Paper, Container } from "@material-ui/core";
import Comment from "./Comment";

class CommentList extends Component {
  renderComments = () => {
    return this.props.comments.map((comment, key) => (
      <Comment key={key} comment={comment}></Comment>
    ));
  };

  render() {
    console.log(this.props.comments);

    return (
      <div style={{ clear: "right" }}>
        <Typography variant="h4" style={{ marginBottom: "2rem" }}>
          Comment
        </Typography>
        <Paper elevation={0} style={{ padding: "2rempx 1rem" }}>
          {this.renderComments()}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};

export default connect(mapStateToProps)(CommentList);
