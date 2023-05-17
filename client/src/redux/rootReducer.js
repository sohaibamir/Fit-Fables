import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import cartReducer from "./Cart/reducer";
import { userReducer } from "./user/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
});
export default rootReducer;
