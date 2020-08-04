import React from "react";
import { Button } from "@material-ui/core";

const FavoriteButton = ({ onFavBtnTextChange, buttonText }) => {
  return (
    <div>
      {" "}
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: "1rem 0" }}
        onClick={onFavBtnTextChange}
        // disabled={disabled}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default FavoriteButton;
