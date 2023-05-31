import "./orders.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/datatable/Datatable";

const Orders = () => {
  const ordersData = {
    tableHeader: ["Order ID", "Customer ID", "Delivery Address", "Order Placement Time", "Order Status"],
    tableBody: [
      { orderId: "1", customerId: "1", deliveryAddress: "Karachi", orderPlaceTime: "1:00 P.M.", orderStatus: "Pending" },
      { orderId: "2", customerId: "2", deliveryAddress: "Lahore", orderPlaceTime: "4:00 P.M.", orderStatus: "Delivered" },
      { orderId: "3", customerId: "3", deliveryAddress: "Islamabad", orderPlaceTime: "6:00 P.M.", orderStatus: "Pending" },
    ],
  };

  return (
    <div className="orders">
      <Sidebar />
      <div className="ordersContainer">
        <Datatable tableTitle="Orders" tableData={ordersData} />
      </div>
    </div>
  );
};

export default Orders;
