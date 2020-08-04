import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Link } from "@material-ui/core";

function MovieContent({ overview, id }) {
  const history = useHistory();
  const trimContent =
    overview.length > 100 ? `${overview.substring(0, 100)} .....` : overview;
  return (
    <Typography variant="body2" component="p">
      {trimContent}
      <Link
        onClick={() => history.push(`/movie/${id}`, { showContent: false })}
      >
        See More
      </Link>
    </Typography>
  );
}

export default MovieContent;
