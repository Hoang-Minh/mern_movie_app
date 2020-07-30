import React, { Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { API_URL, API_KEY } from "../Config";
import MovieBanner from "../MovieBanner/MovieBanner";
import MovieList from "./MovieList";
import ScrollTopArrow from "./ScrollTopArrow";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  state = { movies: [], currentPage: 0 };

  componentDidMount() {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchMovies(endpoint);
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

      this.setState({
        movies: [...this.state.movies, ...results],
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
      this.fetchMovies(endpoint);
    }
  };

  // onInputChange = (event) => {
  //   this.setState({ searchInput: event.target.value });
  // };

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log(nextProps);
  //   console.log(nextState);
  //   // return true;
  //   return nextState.movies.length !== this.state.movies.length;
  // };

  onSearch = () => {
    console.log(this.input.current.firstChild.firstChild.value); // get value !!!
  };

  render() {
    return (
      <div>
        {this.state.movies.length > 0 && (
          <Fragment>
            <MovieBanner showContent movie={this.state.movies[0]}></MovieBanner>

            <TextField
              placeholder="Search...."
              // value={this.state.searchInput}
              // onChange={this.onInputChange}
              ref={this.input}
            ></TextField>
            <Button onClick={() => this.onSearch()}>Submit Search</Button>

            <MovieList
              movies={this.state.movies}
              history={this.props.history}
            ></MovieList>
            <ScrollTopArrow></ScrollTopArrow>

            <br />
          </Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(Home);
