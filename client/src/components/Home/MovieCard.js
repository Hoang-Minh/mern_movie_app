import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../Config";
import MovieRating from "../MovieRating";
import MovieContent from "./MovieContent";
import MovieTitle from "./MovieTitle";

function MovieCard({ movie, history }) {
  return (
    <Card>
      <CardActionArea
        style={{ height: "30rem", border: "1px ridge" }}
        onClick={() =>
          history.push(`/movie/${movie.id}`, {
            showContent: false,
          })
        }
      >
        <CardMedia
          component="img"
          height="250"
          image={`${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`}
          title={movie.original_title}
        ></CardMedia>
        <CardContent>
          <MovieTitle title={movie.original_title}></MovieTitle>
          <Typography component="legend">{movie.vote_average} stars</Typography>
          <MovieRating size={`small`} rating={movie.vote_average}></MovieRating>
          <MovieContent overview={movie.overview} id={movie.id}></MovieContent>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
