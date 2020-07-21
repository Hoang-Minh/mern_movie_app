import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userStatusReducer from "./userStatusReducer";
import favoriteMoviesReducer from "./favoriteMoviesReducer";

export default combineReducers({
  auth: authReducer,
  userStatus: userStatusReducer,
  favMovies: favoriteMoviesReducer,
});
