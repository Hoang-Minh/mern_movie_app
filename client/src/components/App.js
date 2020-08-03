import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import Header from "./Header/Header";
import SignUp from "./SignUp";
import Home from "./Home/Home";
import SignIn from "./SignIn";
import MovieDetail from "./MovieDetail/MovieDetail";
import FavoriteMovies from "./FavoriteMovies";
import { checkLoggedIn } from "../actions";
import AuthHeader from "./Header/AuthHeader";
import UnauthenticatedRoute from "./UnauthenticatedRoutes";
import AuthenticatedRoute from "./AuthenticatedRoutes";
import axios from "axios";

class App extends React.Component {
  //const [isAuthenticated, userHasAuthenticated] = useState(false);

  componentDidMount() {
    this.props.checkLoggedIn();
  }

  // const onLoad = async () => {
  //   try {
  //     await await axios.get("/api/check_logged_in", {
  //       withCredentials: true,
  //     });
  //     userHasAuthenticated(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  render() {
    return (
      <Container maxWidth="lg" disableGutters>
        <BrowserRouter>
          {this.props.auth ? (
            <AuthHeader username={this.props.auth.username}></AuthHeader>
          ) : (
            <Header></Header>
          )}
          <Switch>
            <Route exact path="/" component={Home} />
            <UnauthenticatedRoute
              path="/signin"
              component={SignIn}
              appProps={this.props.auth}
            />
            <UnauthenticatedRoute
              path="/signup"
              component={SignUp}
              appProps={this.props.auth}
            />
            {/* <AuthenticatedRoute
              path="/movie/:movieId"
              component={MovieDetail}
              appProps={this.props.auth}
            />
            <AuthenticatedRoute
              path="/fav_movies"
              component={FavoriteMovies}
              appProps={this.props.auth}
            /> */}

            {/* <Route exact path="/movie/:movieId" component={MovieDetail} />
            <Route exact path="/fav_movies" component={FavoriteMovies} /> */}
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { checkLoggedIn })(App);

// export default App;
