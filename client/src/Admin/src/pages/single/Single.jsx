import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById, getcustomerOrders } from "../../../../api/api";
import Datatable from "../../components/datatable/Datatable";
import ManAvatar from "../../../avatars/man.png";
import WomanAvatar from "../../../avatars/woman.png";

const Single = () => {
  const params = useParams();
  const [info, setInfo] = useState({
    address: "Elton St. 234 Garden Yd. NewYork",
    email: "",
    name: "iPhone",
    phone: "-",
    gender: "female",
  });
  const [orders, setOrders] = useState({ tableHeader: [], tableBody: [] });
  const [chartData, setchartData] = useState([]);

  useEffect(() => {
    let userId = params.userId;
    getUserById(userId)
      .then((res) => {
        if (res.data.data) {
          setInfo({
            address: res.data.data.address,
            email: res.data.data.email,
            name: res.data.data.name,
            phone: res.data.data.phone,
            gender: res.data.data.gender ? res.data.data.gender : "female",
          });
        }
      })
      .catch((err) => console.log(err));

    getcustomerOrders(userId)
      .then((response) => {
        let fetchData = response.data.data;
        if (fetchData.length > 0) {
          let tableHeader = [
            "Order ID",
            "Customer ID",
            "Total Items",
            "Status",
            "Amount",
          ];
          let tableBody = [];
          fetchData.map((order) => {
            tableBody.push({
              orderId: order._id,
              customerId: order.userId,
              quantity: order.cartItems ? order.cartItems.length : 0,
              status: order.status ? order.status : "Pending",
              total: order.totalPrice ? order.totalPrice : "N/A",
            });
          });
          setOrders({
            tableHeader,
            tableBody,
          });
        }
        // if (fetchData.length > 0) {
        //   let tableHeader = ["Order ID", "Quantity", "Status", "Total"];
        //   let tableBody = [];
        //   fetchData.map((order) => {
        //     tableBody.push({
        //       orderId: order._id,
        //       quantity: order.cartItems ? order.cartItems.length : 0,
        //       status: order.status ? order.status : "Pending",
        //       total: 500,
        //     });
        //   });
        //   setOrders({
        //     tableHeader,
        //     tableBody,
        //   });
        // }
        setchartData(response.data.dataForChart);
      })
      .catch((err) => console.log(err));
  }, [params]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div>
            <h1 className="title">Information</h1> */}
            <div className="item">
              <img
                // src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                src={info.gender === "female" ? WomanAvatar : ManAvatar}
                // src={ManAvatar}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{info.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{info.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">
                    {info.phone ? info.phone : "-"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{info.address}</span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              aspect={3 / 1}
              title={`${info.name}'s Spending ( Last 6 Months)`}
              data={chartData}
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <div className="ordersContainer">
            <Datatable tableTitle="Last Transactions" tableData={orders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
