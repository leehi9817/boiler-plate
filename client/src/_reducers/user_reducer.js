import { LOGIN_USER } from "../_actions/types";

const initialState = {
  auth: false,
  userId: null,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      if (action.payload.success) {
        return {
          ...state,
          auth: true,
          userId: action.payload.data.userId,
          error: null,
        };
      }

      return {
        auth: false,
        error: action.payload.error,
        userId: null,
      };
    default:
      return state;
  }
}
