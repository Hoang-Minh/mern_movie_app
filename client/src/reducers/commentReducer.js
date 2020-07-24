import { ADD_COMMENT, FETCH_COMMENTS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, ...action.payload];
    case FETCH_COMMENTS:
      return state;
    default:
      return state;
  }
};
