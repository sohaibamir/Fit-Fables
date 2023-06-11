import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../../api/api";

const Home = () => {

  const [dataForChart,setDataForChart] = useState([])
  const [todaySale,settodaySale] = useState(0)
  const [weekSale,setweekSale] = useState(0)
  const [monthSale,setmonthSale] = useState(0)
  const [totalOrders,settotalOrders] = useState(0)
  const [totalUsers,settotalUsers] = useState(0)
  const [totalOrdersAmount,settotalOrdersAmount] = useState(0)

  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });

    getDataForDashboard();

  }, []);

  const getDataForDashboard=()=>{
    getDashboardData()
    .then((response)=>{
      console.log(response);
      setDataForChart(response.data.dataForChart)
      settodaySale(response.data.todaySales)
      setweekSale(response.data.weekSales)
      setmonthSale(response.data.monthSales)
      settotalOrders(response.data.totalOrders)
      settotalUsers(response.data.totalUsers)
      settotalOrdersAmount(response.data.totalOrdersAmount)
    })
    .catch((error)=>console.log(error))
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" amount={totalUsers} />
          <Widget type="order" amount={totalOrders} />
          <Widget type="earning" amount={todaySale} />
          <Widget type="balance" amount={totalOrdersAmount} />
        </div>
        <div className="charts">
          <Featured todaySale={todaySale} weekSale={weekSale} monthSale={monthSale} />
          <Chart title="Last 6 Months (Revenue)" data={dataForChart} aspect={2 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
