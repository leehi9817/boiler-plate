import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../types";

const initialState = {
  isAuth: false,
  isAdmin: false,
  profile: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload.success,
        profile: action.payload.data ?? null,
      };

    case REGISTER_USER:
      return {
        ...state,
        registerSuccess: action.payload.success,
      };

    case AUTH_USER:
      return {
        ...state,
        isAuth: action.payload?.isAuth ?? false,
        isAdmin: action.payload?.isAdmin ?? false,
        profile: action.payload.data ?? null,
      };

    default:
      return state;
  }
}
