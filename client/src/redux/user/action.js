export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const LOGOUT = "LOGOUT";

export const setLoggedInUser = (email, token, name, role, _id) => {
  return { type: LOGGED_IN_USER, payload: { email, token, name, role, _id } };
};

export const logoutUser = () => {
  return { type: LOGOUT, payload: null };
};
