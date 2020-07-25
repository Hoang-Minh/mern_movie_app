import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography, Paper } from "@material-ui/core";
import Comment from "./Comment";
import { deleteComment } from "../actions";

class CommentList extends Component {
  renderComments = () => {
    return this.props.comments.map((comment, key) => (
      <Comment
        key={key}
        comment={comment}
        loggedInUsername={this.props.auth ? this.props.auth.username : null}
        onSubmit={() => this.onSubmit(comment)}
      ></Comment>
    ));
  };

  onSubmit = (comment) => {
    this.props.deleteComment(
      this.props.auth.id,
      this.props.movieId,
      comment._id
    );
  };

  render() {
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
    auth: state.auth,
    comments: state.comments,
  };
};

export default connect(mapStateToProps, { deleteComment })(CommentList);
