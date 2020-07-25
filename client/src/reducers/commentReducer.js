import {
  ADD_COMMENT,
  FETCH_COMMENTS,
  DELETE_COMMENT,
  CLEAR_ALL,
} from "../actions/types";

export default (state = [], action) => {
  console.log("reducer payload", action.payload);
  console.log("reducer type", action.type);
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.payload]; // action.payload is not an arry cannot do ...action.payloads
    case FETCH_COMMENTS:
      return action.payload;
    case DELETE_COMMENT:
      return state.filter((comment) => comment._id !== action.payload._id);
    case CLEAR_ALL:
      return null;
    default:
      return state;
  }
};
