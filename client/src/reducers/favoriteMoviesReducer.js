import {
  ADD_FAVORITE_MOVIE,
  FAVORITE_MOVIES,
  DELETE_FAVORITE_MOVIE,
  CLEAR_ALL,
} from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FAVORITE_MOVIES:
      return action.payload;
    case ADD_FAVORITE_MOVIE:
      return [...state, action.payload]; // because movieInDb was returned from the response, so need to add in
    case DELETE_FAVORITE_MOVIE:
      return state.filter((movie) => movie._id !== action.payload._id);
    case CLEAR_ALL:
      return null;
    default:
      return state;
  }
}
