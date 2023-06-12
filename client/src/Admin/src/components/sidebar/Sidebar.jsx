import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import StoreIcon from "@mui/icons-material/Store";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/user/action";

const Sidebar = ({ isDoctorPanel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const clearSession = () => {
    localStorage.clear();
    dispatch(logoutUser());
  };

  return (
    <div className="sidebar">
      <hr />
      {!isDoctorPanel ? (
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <li>
              <DashboardIcon className="icon" />
              <Link to="/admin">
                <span>Dashboard</span>
              </Link>
            </li>
            <p className="title">LISTS</p>
            <Link to="/admin/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
            <Link to="/admin/products" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>Products</span>
              </li>
            </Link>
            <Link to="/admin/orders" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                <span>Orders</span>
              </li>
            </Link>
            <Link to="/admin/doctors">
              <li>
                <MedicalInformationIcon
                  className="icon"
                  style={{ textDecoration: "none" }}
                />
                <span>Doctors</span>
              </li>
            </Link>
            <p className="title">USER</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
            <li>
              <ExitToAppIcon className="icon" />
              <span
                onClick={() => {
                  clearSession();
                  toast({
                    title: "Logged out Successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                  navigate("/");
                }}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
            <p className="title">LISTS</p>
            <Link to="/admin/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Remaining Appointments</span>
              </li>
            </Link>
            <Link to="/admin/products" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>Completed Appointments</span>
              </li>
            </Link>
            <p className="title">USER</p>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
