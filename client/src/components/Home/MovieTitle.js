import React, { Fragment } from "react";
import { Typography, Link } from "@material-ui/core";

function MovieTitle({ title }) {
  const trimTitle = title.length > 25 ? title.substring(0, 25) : title;

  return (
    <Typography gutterBottom variant="subtitle2">
      {trimTitle}
    </Typography>
  );
}

export default MovieTitle;
