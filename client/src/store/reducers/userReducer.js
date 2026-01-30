import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "../types";

const initialState = {
  authCheck: false,
  isAuth: false,
  isAdmin: false,
  profile: null,
  login: {
    success: false,
    error: null,
  },
  register: {
    success: false,
    error: null,
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        login: {
          success: action.payload.success,
          error: action.payload.error ?? null,
        },
      };

    case REGISTER_USER:
      return {
        ...state,
        register: {
          success: action.payload.success,
          error: action.payload.error ?? null,
        },
      };

    case AUTH_USER:
      return {
        ...state,
        authCheck: true,
        isAuth: action.payload?.isAuth ?? false,
        isAdmin: action.payload?.isAdmin ?? false,
        profile: action.payload?.data ?? null,
      };

    case LOGOUT_USER:
      return {
        ...state,
        authCheck: true,
        isAuth: false,
        isAdmin: false,
        profile: null,
      };

    default:
      return state;
  }
}
