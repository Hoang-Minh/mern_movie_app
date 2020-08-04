import React, { Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { API_URL, API_KEY } from "../Config";
import MovieBanner from "../MovieBanner/MovieBanner";
import MovieList from "./MovieList";
import ScrollTopArrow from "./ScrollTopArrow";
import Search from "./Search";

class Home extends React.Component {
  state = {
    movies: [], // movies that is loading from current page
    currentPage: 0,
    loading: true,
    resultMovies: [], // movies come from search term keyword
    currentMovies: [], // movies displayed on page
  };

  componentDidMount() {
    if (this.state.loading) {
      const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchMovies(endpoint);
    }
  }

  componentWillMount() {
    window.addEventListener("scroll", this.loadMore);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
  }

  fetchMovies = async (endpoint) => {
    try {
      const response = await axios.get(endpoint);
      console.log("fetch movies", response);
      const { results, page } = response.data;

      this.setState(
        {
          movies: [...this.state.movies, ...results],
          currentPage: page,
        },
        () => this.setState({ currentMovies: this.state.movies })
      );
    } catch (error) {
      console.log(error);
    }
  };

  loadMore = () => {
    if (this.state.loading) {
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
        this.fetchMovies(endpoint);
      }
    }
  };

  onTermSearch = (results) => {
    console.log("change movie", results);
    this.setState({ resultMovies: results, loading: false }, () =>
      this.setState({ currentMovies: this.state.resultMovies })
    );
  };

  onClearTerm = () => {
    console.log("search was cleared");
    this.setState({ currentMovies: this.state.movies });
  };

  renderContent = () => {
    if (this.state.currentMovies.length === 0) return null;

    console.log(this.state.currentMovies);

    return (
      <Fragment>
        <MovieBanner
          showContent
          movie={this.state.currentMovies[0]}
        ></MovieBanner>
        <Grid
          container
          style={{ justifyContent: "center", alignContent: "center" }}
        >
          <Grid item xs={12} md={6}>
            <Search
              onTermSearch={this.onTermSearch}
              onClearTerm={this.onClearTerm}
            ></Search>
          </Grid>
        </Grid>
        <MovieList
          movies={this.state.currentMovies}
          history={this.props.history}
        ></MovieList>
        <ScrollTopArrow></ScrollTopArrow>
        <br />
      </Fragment>
    );
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default withRouter(Home);
