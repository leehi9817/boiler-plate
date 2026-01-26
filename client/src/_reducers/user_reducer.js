import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

const initialState = {
  auth: false,
  data: null,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      if (action.payload.success) {
        return {
          ...state,
          auth: true,
          data: action.payload.data.userId,
          error: null,
        };
      }

      return {
        auth: false,
        error: action.payload.error,
        userId: null,
      };

    case REGISTER_USER:
      if (action.payload.success) {
        return {
          ...state,
          register: true,
          data: action.payload.data,
        };
      }

      return {
        register: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
