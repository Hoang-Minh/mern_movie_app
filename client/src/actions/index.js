import axios from "axios";
import {
  FETCH_USER,
  ADD_USER,
  ADD_FAVORITE_MOVIE,
  DELETE_FAVORITE_MOVIE,
  FAVORITE_MOVIES,
  ADD_COMMENT,
  FETCH_COMMENTS,
  DELETE_COMMENT,
  CLEAR_ALL,
} from "./types";

export const checkLoggedIn = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/check_logged_in", {
      withCredentials: true,
    });

    console.log(response);

    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (error) {
    // send to get new token ?
    console.log(error);
  }
};

// for signup
export const signUpUser = (formValues, history) => async (dispatch) => {
  console.log(formValues);
  try {
    const response = await axios.post("/api/signup", formValues);
    const { data } = response;
    history.push("/signin");
    dispatch({ type: ADD_USER, payload: data.token ? true : false });
  } catch (error) {
    console.log(error);
  }
};

// For login
export const fetchUser = (formValues, history) => async (dispatch) => {
  console.log("login route", formValues);
  const response = await axios.post("/api/signin", formValues, {
    withCredentials: true,
  });
  const { data } = response;
  history.push("/");
  dispatch({ type: FETCH_USER, payload: data });
};

// for sign out
export const signOutUser = (history) => async (dispatch) => {
  console.log("log out", history);
  try {
    await axios.get("/api/clear_cookies");
    const response = await axios.get("/api/signout");

    console.log("response from signout", response.data);

    history.push("/");
    dispatch({ type: CLEAR_ALL });
    // dispatch({ typpe: RESET_COMMENTS });
  } catch (error) {
    console.log(error);
  }
};

// get list of fav movies that currently logged in user has
export const getListOfFavMovies = () => async (dispatch) => {
  const response = await axios.get("/api/user/movies");
  const { data } = response;
  dispatch({ type: FAVORITE_MOVIES, payload: data });
};

export const addFavoriteMovie = (movieData) => async (dispatch) => {
  try {
    console.log("add favorite movie");

    const response = await axios.post("/api/user/movies", movieData);
    const { data } = response;

    console.log("response back from adding fav movie", response);

    dispatch({ type: ADD_FAVORITE_MOVIE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFavoriteMovie = (movieId) => async (dispatch) => {
  const response = await axios.delete(`/api/user/movies/${movieId}`);
  const { data } = response;
  console.log("deleted movie", data);
  dispatch({ type: DELETE_FAVORITE_MOVIE, payload: data.movieInDb });
};

export const addComment = (userId, movie, comment) => async (dispatch) => {
  console.log("add comment");
  console.log(comment);
  const movieId = movie.id;
  const response = await axios.post(
    `/api/users/${userId}/movies/${movieId}/comments`,
    { text: comment.trim(), movie }
  );
  console.log("response from add Comment", response.data);
  dispatch({ type: ADD_COMMENT, payload: response.data });
};

export const fetchComments = (movieId) => async (dispatch) => {
  console.log("fetch comments");
  const response = await axios.get(`/api/user/movies/${movieId}`);
  console.log("fetch comments", response.data);

  dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const deleteComment = (userId, movieId, commentId) => async (
  dispatch
) => {
  console.log("delete comment");
  console.log(userId, movieId, commentId);
  const response = await axios.delete(
    `/api/users/${userId}/movies/${movieId}/comments/${commentId}`
  );

  console.log("delete comment", response.data);
  dispatch({ type: DELETE_COMMENT, payload: response.data });
};
