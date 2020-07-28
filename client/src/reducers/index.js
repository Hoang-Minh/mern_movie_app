import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import userStatusReducer from "./userStatusReducer";
import favoriteMoviesReducer from "./favoriteMoviesReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  auth: authReducer,
  userStatus: userStatusReducer,
  favMovies: favoriteMoviesReducer,
  comments: commentReducer,
  form: formReducer,
});
