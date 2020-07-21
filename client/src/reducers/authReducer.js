import { FETCH_USER, SIGN_OUT } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return null;
    default:
      return state;
  }
}
