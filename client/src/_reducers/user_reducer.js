import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
  isRegistered: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: action.payload.success,
        user: action.payload.data ?? null,
      };

    case REGISTER_USER:
      return {
        ...state,
        isRegistered: action.payload.success,
      };

    default:
      return state;
  }
}
