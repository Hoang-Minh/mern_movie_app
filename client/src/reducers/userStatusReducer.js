import { ADD_USER } from "../actions/types";

const initialState = { registered: false };
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, registered: action.payload };
    default:
      return state;
  }
}
