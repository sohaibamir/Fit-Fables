import React from "react";
import List from "../Admin/src/pages/list/List";
import ProductList from "../Admin/src/pages/list/ProductList";
import Single from "../Admin/src/pages/single/Single";
import NewOrEditProduct from "../Admin/src/pages/newOrEditProduct/NewOrEditProduct";
import HomeUser from "../components/home/HomeUser";
import { Route, Routes } from "react-router-dom";
import Home from "../Admin/src/pages/home/Home";
import {
  doctorInputs,
  orderInputs,
  productInputs,
} from "../Admin/src/formSource";
import Healthcare from "./Healthcare";
import Products from "./Products";
import MyOrders from "./MyOrders";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import Search from "./Search";
import Delivery from "./Delivery";
import HealthBlogs from "./HealthBlogs";
import Offers from "./Offers";
import Orders from "../Admin/src/pages/orders/Orders";
import Doctors from "../Admin/src/pages/doctors/Doctors";
import NewOrEditDoctor from "../Admin/src/pages/newOrEditDoctor/NewOrEditDoctor";
import ViewOrderDetails from "../Admin/src/pages/viewOrderDetails/ViewOrderDetails";
import ProductsByCategory from "./ProductsByCategory";
import AdminRoute from "../auth/AdminRoute";
import Consultation from "./Consultation";
import DoctorHomePage from '../Doctor/src/pages/DoctorHomePage/DoctorHomePage';
import { doctorPanelInputs } from "../Doctor/src/formSource";
import CompletedAppointments from "../Doctor/src/pages/CompletedAppointments/CompletedAppoinments";
import RemainingAppointments from "../Doctor/src/pages/RemainingAppointments/RemainingAppoinments";

function AllRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<HomeUser />} />
      <Route
        exact
        path="/admin"
        element={
          <AdminRoute>
            <Home />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <List />
          </AdminRoute>
        }
      />
      <Route
        exact
        path="/admin/:userId"
        element={
          <AdminRoute>
            {" "}
            <Single />
          </AdminRoute>
        }
      />
      {/* <Route
        exact
        path="/admin/new/user"
        element={<New inputs={userInputs} title="Add New User" />}
      /> */}

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/new/product"
        element={
          <AdminRoute>
            <NewOrEditProduct inputs={productInputs} title="Add New Product" />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/product/:productId"
        element={
          <AdminRoute>
            <NewOrEditProduct
              inputs={productInputs}
              title="Edit Product Details"
            />
          </AdminRoute>
        }
      />

      <Route
        exact
        path="/admin/new/doctor"
        element={
          <AdminRoute>
            <NewOrEditDoctor inputs={doctorInputs} title="Add New Doctor" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/doctors/:doctorId"
        element={
          <AdminRoute>
            <NewOrEditDoctor
              inputs={doctorInputs}
              title="Edit Doctor Details"
            />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders/:orderId"
        element={
          <AdminRoute>
            <ViewOrderDetails inputs={orderInputs} title="Order Details" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <AdminRoute>
            <Doctors />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <Orders />
          </AdminRoute>
        }
      />

      <Route path="/doctor" element={<DoctorHomePage inputs={doctorPanelInputs} />} />
      <Route path="/doctor/completed-appointments" element={<CompletedAppointments />} />
      <Route path="/doctor/remaining-appointments" element={<RemainingAppointments />} />

      <Route path="/healthcare" element={<Healthcare />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/health-blogs" element={<HealthBlogs />} />
      <Route path="/:cat" element={<ProductsByCategory />} />
      <Route path="/healthcare/products/:cat" element={<Products />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/search/:name" element={<Search />} />
    </Routes>
  );
}

export default AllRoutes;
