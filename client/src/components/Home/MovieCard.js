import React, { Fragment } from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Link,
} from "@material-ui/core";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../Config";
import MovieRating from "../MovieRating";

function MovieCard({ movie, history }) {
  const trimTitle = (title) => {
    return title.length > 25 ? title.substring(0, 25) : title;
  };

  const renderMovieContent = (content, id) => {
    const short =
      content.length > 100 ? `${content.substring(0, 100)} .....` : content;

    return (
      <Fragment>
        {short}
        <Link
          onClick={() => history.push(`/movie/${id}`, { showContent: false })}
        >
          See More
        </Link>
      </Fragment>
    );
  };

  return (
    <Card>
      <CardActionArea
        style={{ height: "30rem" }}
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
          <Typography gutterBottom variant="subtitle2">
            {trimTitle(movie.original_title)}
          </Typography>
          <Typography component="legend">{movie.vote_average} stars</Typography>
          <MovieRating size={`small`} rating={movie.vote_average}></MovieRating>
          <Typography variant="body2" component="p">
            {renderMovieContent(movie.overview, movie.id)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
