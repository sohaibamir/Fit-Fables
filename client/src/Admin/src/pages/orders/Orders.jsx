import "./orders.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/datatable/Datatable";
import { getAllOrdersAdmin } from "../../../../api/api";
import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState({
    tableHeader: [],
    tableBody: [],
  });

  useEffect(() => {
    getAllOrdersAdmin()
      .then((res) => {
        console.log(res);
        if (res.data && res.data.data && res.data.data.length > 0) {
          let fetchData = res.data.data;
          console.log(fetchData);
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
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="orders">
      <Sidebar />
      <div className="ordersContainer">
        <Datatable tableTitle="Orders" tableData={orders} />
      </div>
    </div>
  );
};

export default Orders;
