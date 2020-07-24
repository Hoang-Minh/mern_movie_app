import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import axios from "axios";
import { API_KEY, API_URL } from "../Config";
import MovieBanner from "../MovieBanner/MovieBanner";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieRating from "../MovieRating";
import Trailer from "../Trailer";
import MainCasts from "../MainCasts";
import CommentList from "../CommentList";
import {
  getListOfFavMovies,
  addFavoriteMovie,
  fetchComments,
} from "../../actions";
import FavoriteButton from "../FavoriteButton";
import CommentInput from "../CommentInput";

class MovieDetail extends Component {
  state = { movie: null };

  // loading page: need to call fetch users and look into the favMovies first.
  componentDidMount() {
    const path = this.props.location.pathname;
    const regex = /\d+/;
    const movieId = path.match(regex).join("");
    console.log(movieId);
    this.props.getListOfFavMovies();
    this.props.fetchComments(movieId);
    this.fetchMovie(path);
  }

  fetchMovie = async (pathname) => {
    const endpoint = `${API_URL}${pathname}?api_key=${API_KEY}&language=en-US`;
    console.log("endpoint for fetch movie", endpoint);
    const response = await axios.get(endpoint);
    const { data } = response;
    this.setState({ movie: data });
  };

  renderFavButton = () => {
    if (!this.props.auth) return null;

    let btnText = "Add To Favorite";

    if (this.isCurrentMovieFavorite()) {
      btnText = "Added To Favorite";
    }
    return (
      <FavoriteButton
        buttonText={btnText}
        onFavBtnTextChange={this.onClickFavButton}
      ></FavoriteButton>
    );
  };

  isCurrentMovieFavorite = () => {
    const haveFav = this.props.favMovies.some(
      (each) => each.movieId === this.state.movie.id.toString()
    );
    console.log("is Fav", haveFav);
    return haveFav;
  };

  onClickFavButton = async () => {
    if (!this.props.auth) return;
    console.log("testing");

    const {
      title,
      id: movieId,
      overview: plot,
      poster_path: poster,
    } = this.state.movie;

    if (!this.isCurrentMovieFavorite()) {
      // add later on will need a condition to handle remove
      this.props.addFavoriteMovie({ title, movieId, plot, poster });
    }
  };

  renderContent = () => {
    const { movie } = this.state;
    if (!movie) return null;
    return (
      <Fragment>
        <MovieBanner showContent={false} movie={movie}></MovieBanner>
        <Box textAlign="center">
          <Box
            fontWeight="fontWeightMedium"
            fontStyle="oblique"
            fontSize={20}
            style={{ color: "#5bc0de", margin: "1rem 0" }}
          >
            {movie.tagline}
          </Box>
          <MovieRating size={`large`} rating={movie.vote_average}></MovieRating>
          {/* here is the fav button */}
          {this.renderFavButton()}
          <Box style={{ marginTop: "0.5rem" }}>{movie.vote_count} votes</Box>
        </Box>
        <MovieInfo movie={movie}></MovieInfo>
        <Trailer pathname={this.props.location.pathname}></Trailer>
        <MainCasts pathname={this.props.location.pathname}></MainCasts>
        {this.renderComments()}
        <CommentList comments={this.props.comments}></CommentList>
      </Fragment>
    );
  };

  renderComments = () => {
    if (this.state.movie && this.props.auth) {
      const movieId = this.state.movie.id;
      return (
        <CommentInput
          userId={this.props.auth.id}
          movieId={movieId}
        ></CommentInput>
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    favMovies: state.favMovies,
    comments: state.comments,
  };
};

export default connect(mapStateToProps, {
  getListOfFavMovies,
  addFavoriteMovie,
  fetchComments,
})(MovieDetail);
