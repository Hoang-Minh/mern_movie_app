import React from "react";
import MovieCard from "./MovieCard";
import { Grid } from "@material-ui/core";

function MovieList({ movies, history }) {
  if (!movies) return null;
  const renderList = () => {
    return movies.map((movie, index) => {
      return (
        <Grid key={index} md={3} xs={12} item>
          <MovieCard movie={movie} history={history}></MovieCard>
        </Grid>
      );
    });
  };

  return (
    <Grid container direction="row" spacing={3}>
      {renderList()}
    </Grid>
  );
}

export default MovieList;
