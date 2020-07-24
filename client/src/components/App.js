import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import Header from "./Header/Header";
import SignUp from "./SignUp";
import Home from "./Home/Home";
import SignIn from "./SignIn";
import MovieDetail from "./MovieDetail/MovieDetail";
import FavoriteMovies from "./FavoriteMovies";
import { checkLoggedIn } from "../actions";

class App extends React.Component {
  componentDidMount() {
    this.props.checkLoggedIn();
  }

  render() {
    return (
      <Container maxWidth="lg" disableGutters>
        <BrowserRouter>
          <Header></Header>
          {/* <NewHeader></NewHeader> */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route exact path="/movie/:movieId" component={MovieDetail} />
            <Route exact path="/fav_movies" component={FavoriteMovies} />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default connect(null, { checkLoggedIn })(App);
