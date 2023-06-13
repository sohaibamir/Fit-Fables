import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import StoreIcon from "@mui/icons-material/Store";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/user/action";

const Sidebar = () => {
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
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/doctor">
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/doctor/remaining-appointments" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Remaining Appointments</span>
            </li>
          </Link>
          <Link to="/doctor/completed-appointments" style={{ textDecoration: "none" }}>
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
    </div>
  );
};

export default Sidebar;
