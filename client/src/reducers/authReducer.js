import { FETCH_USER, CLEAR_ALL } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, ...action.payload };
    case CLEAR_ALL:
      return { isLoggedIn: false };
    default:
      return state;
  }
}
