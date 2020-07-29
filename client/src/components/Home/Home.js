import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { API_URL, API_KEY } from "../Config";
import MovieBanner from "../MovieBanner/MovieBanner";
import MovieList from "./MovieList";
import ScrollTopArrow from "./ScrollTopArrow";

class Home extends React.Component {
  state = { movies: [], featureMovie: null, currentPage: 0 };

  componentDidMount() {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchMovies(endpoint);
    console.log(this.props);
  }

  componentWillMount() {
    window.addEventListener("scroll", this.loadMore);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
  }

  fetchMovies = async (endpoint, loadFeatureMovie = true) => {
    try {
      const response = await axios.get(endpoint);
      console.log("fetch movies", response);
      const { results, page } = response.data;

      this.setState({
        movies: [...this.state.movies, ...results],
        featureMovie: loadFeatureMovie ? results[0] : this.state.featureMovie,
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadMore = () => {
    //console.log("Load more");
    let endpoint = "";
    //console.log("Current Page", this.state.currentPage);
    endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${
      this.state.currentPage + 1
    }`;

    // console.log(window.innerHeight + document.documentElement.scrollTop);
    // console.log(document.scrollingElement.scrollHeight);

    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >=
      document.scrollingElement.scrollHeight
    ) {
      // Do load more content here!
      this.fetchMovies(endpoint, false);
    }
  };

  render() {
    return (
      <div>
        {this.state.featureMovie && (
          <MovieBanner
            showContent
            movie={this.state.featureMovie}
          ></MovieBanner>
        )}

        {/* {this.state.movies && (
          <Typography align="center" display="block" variant="h3" gutterBottom>
            Popular Movies
          </Typography>
        )} */}

        <MovieList
          movies={this.state.movies}
          history={this.props.history}
        ></MovieList>
        <ScrollTopArrow></ScrollTopArrow>

        <br />
      </div>
    );
  }
}

export default withRouter(Home);
