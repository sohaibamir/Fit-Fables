import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../api/api";

const PrivateRoute = ({ children }) => {
  const { location } = useLocation();
  return isAuthenticated().role !== "admin" ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: isAuthenticated().role === "admin" ? "/admin" : "/",
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;
