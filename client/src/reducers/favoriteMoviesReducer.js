import {
  ADD_FAVORITE_MOVIE,
  FAVORITE_MOVIES,
  DELETE_FAVORITE_MOVIE,
} from "../actions/types";
// import _ from "lodash";
// state will be list of movies added by this user
export default function (state = [], action) {
  switch (action.type) {
    case FAVORITE_MOVIES:
      return action.payload;
    case ADD_FAVORITE_MOVIE:
      return [...state, action.payload]; // because movieInDb was returned from the response, so need to add in
    case DELETE_FAVORITE_MOVIE:
      return state.filter((movie) => movie._id !== action.payload._id);
    default:
      return state;
  }
}
