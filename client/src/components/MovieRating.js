import React from "react";
import { Rating } from "@material-ui/lab";
import Box from "@material-ui/core/Box";

function MovieRating({ rating, size }) {
  return (
    <div>
      <Rating
        name="customized-10"
        defaultValue={rating}
        max={10}
        readOnly
        precision={0.5}
        size={size}
      />
    </div>
  );
}

export default MovieRating;
