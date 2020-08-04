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
import UnauthenticatedRoute from "./UnauthenticatedRoutes";
import AuthenticatedRoute from "./AuthenticatedRoutes";

class App extends React.Component {
  state = { isLoggedIn: false, username: "" };

  componentDidMount() {
    console.log("check login");
    this.props.checkLoggedIn();
  }

  componentDidUpdate() {
    // this.setState({
    //   isLoggedIn: this.props.auth.isLoggedIn,
    //   username: this.props.auth.username,
    // });
    const isLogged = this.props.auth.isLoggedIn;
    const name = this.props.auth.username;

    this.setState({
      isLoggedIn: isLogged,
      username: name,
    });

    // console.log(this.props.auth.isLoggedIn);
    // console.log(this.props.auth.username);
  }

  render() {
    return (
      <Container maxWidth="lg" disableGutters>
        <BrowserRouter>
          <Header username={this.state.username}></Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <UnauthenticatedRoute
              path="/signin"
              component={SignIn}
              appProps={this.state.isLoggedIn}
            />
            <UnauthenticatedRoute
              path="/signup"
              component={SignUp}
              appProps={this.state.isLoggedIn}
            />
            {/* <UnauthenticatedRoute
              path="/movie/:movieId"
              component={MovieDetail}
              appProps={this.state.isLoggedIn}
            /> */}
            <Route exact path="/movie/:movieId" component={MovieDetail}></Route>
            <AuthenticatedRoute
              path="/fav_movies"
              component={FavoriteMovies}
              appProps={this.state.isLoggedIn}
            />
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
