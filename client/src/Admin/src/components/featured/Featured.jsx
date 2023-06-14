import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = ({ todaySale, weekSale, monthSale }) => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={(todaySale / 10000) * 100}
            text={`${(todaySale / 10000) * 100}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">{`Rs ${todaySale}`}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          {10000 - todaySale > 0 ? (
            <div className="item">
              <div className="itemTitle">Target</div>
              <div className="itemResult negative">
                <KeyboardArrowDownIcon fontSize="small" />
                <div className="resultAmount">{`${10000 - todaySale} Rs`}</div>
              </div>
            </div>
          ) : (
            <div className="item">
              <div className="itemTitle">Target</div>
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">{`${(10000 - todaySale).toFixed(0)} Rs`}</div>
              </div>
            </div>
          )}
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{`${weekSale.toFixed(0)} Rs`}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{`${monthSale.toFixed(0)} Rs`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
