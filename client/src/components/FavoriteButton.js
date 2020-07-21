import React from "react";
import { Button } from "@material-ui/core";

class FavoriteButton extends React.Component {
  render() {
    return (
      <div>
        {" "}
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "1rem 0" }}
          onClick={this.props.onFavBtnTextChange}
        >
          {this.props.buttonText}
        </Button>
      </div>
    );
  }
}

export default FavoriteButton;
