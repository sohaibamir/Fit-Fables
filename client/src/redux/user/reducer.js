import { LOGGED_IN_USER, LOGOUT } from "./action";

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return { user: action.payload };

    case LOGOUT:
      return { user: action.payload };

    default:
      return state;
  }
};
