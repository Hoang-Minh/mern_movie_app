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

// const useStyles = makeStyles((theme) => ({
//   button: {
//     backgroundColor: "#EDF3F4",
//     float: "right",
//   },
//   textArea: {
//     width: "100%",
//   },
// }));

class CommentInput extends Component {
  state = { comment: "" };

  handChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { userId, movieId } = this.props;

    return (
      <div>
        <Fragment>
          <Typography
            align="left"
            display="block"
            variant="button"
            style={{ margin: "2rem 0 auto" }}
            gutterBottom
          >
            Share your comments about the movie
          </Typography>
          {/* <Grid
            container
            diretion="row"
            spacing={1}
            style={{ marginBottom: "3rem" }}
          ></Grid> */}
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
            onClick={() =>
              this.props.addComment(userId, movieId, this.state.comment)
            }
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </Fragment>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth,
//     comments: state.comments,
//   };
// };

export default connect(null, { addComment })(CommentInput);
