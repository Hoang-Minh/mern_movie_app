import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextareaAutosize,
  Button,
  Icon,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";

import { addComment } from "../actions";

class CommentInput extends Component {
  state = { comment: "" };

  handChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = () => {
    const { userId, movie } = this.props;
    this.props.addComment(userId, movie, this.state.comment);
    this.setState({ comment: "" });
  };

  render() {
    return (
      <div>
        <Fragment>
          <Box component="div">
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Comment..."
              rowsMin={10}
              rowsMax={15}
              style={{ width: "100%" }}
              value={this.state.comment}
              onChange={(event) => this.handChange(event)}
            />
          </Box>
          <Button
            style={{ backgroundColor: "#EDF3F4", float: "right" }}
            onClick={() => this.handleSubmit()}
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </Fragment>
      </div>
    );
  }
}

export default connect(null, { addComment })(CommentInput);
