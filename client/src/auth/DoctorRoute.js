import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../api/api";

const DoctorRoute = ({ children }) => {
  const { location } = useLocation();
  return isAuthenticated() && isAuthenticated().role === "doctor" ? (
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

export default DoctorRoute;
