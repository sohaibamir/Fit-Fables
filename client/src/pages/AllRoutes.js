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
import DoctorRoute from "../auth/DoctorRoute";
import PrivateRoute from "../auth/PrivateRoute";
import Consultation from "./Consultation";
import DoctorHomePage from "../Doctor/src/pages/DoctorHomePage/DoctorHomePage";
import { doctorPanelInputs } from "../Doctor/src/formSource";
import CompletedAppointments from "../Doctor/src/pages/CompletedAppointments/CompletedAppoinments";
import RemainingAppointments from "../Doctor/src/pages/RemainingAppointments/RemainingAppoinments";
import PrivacyPolicy from "./PrivacyPolicy";
import ProductInventory from "../Admin/src/pages/simulation/ProductInventory";
import CategoryInventory from "../Admin/src/pages/simulation/CategoryInventory";
import CityInventory from "../Admin/src/pages/simulation/CityInventory";
import GenderInventory from "../Admin/src/pages/simulation/GenderInventory";

function AllRoutes() {
  return (
    <Routes>
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

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/inventory-product"
        element={
          <AdminRoute>
            <ProductInventory />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/inventory-category"
        element={
          <AdminRoute>
            <CategoryInventory />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/inventory-city"
        element={
          <AdminRoute>
            <CityInventory />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/inventory-gender"
        element={
          <AdminRoute>
            <GenderInventory />
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

      <Route
        path="/doctor"
        element={
          <DoctorRoute>
            <DoctorHomePage inputs={doctorPanelInputs} />
          </DoctorRoute>
        }
      />
      <Route
        path="/doctor/completed-appointments"
        element={
          <DoctorRoute>
            <CompletedAppointments />
          </DoctorRoute>
        }
      />
      <Route
        path="/doctor/remaining-appointments"
        element={
          <DoctorRoute>
            <RemainingAppointments />
          </DoctorRoute>
        }
      />

      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <HomeUser />
          </PrivateRoute>
        }
      />

      <Route
        path="/healthcare"
        element={
          <PrivateRoute>
            <Healthcare />
          </PrivateRoute>
        }
      />
      <Route
        path="/offers"
        element={
          <PrivateRoute>
            <Offers />
          </PrivateRoute>
        }
      />
      <Route
        path="/health-blogs"
        element={
          <PrivateRoute>
            <HealthBlogs />
          </PrivateRoute>
        }
      />
      <Route
        path="/:cat"
        element={
          <PrivateRoute>
            <ProductsByCategory />
          </PrivateRoute>
        }
      />
      <Route
        path="/healthcare/products/:cat"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <PrivateRoute>
            <SingleProduct />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/delivery"
        element={
          <PrivateRoute>
            <Delivery />
          </PrivateRoute>
        }
      />
      <Route
        path="/consultation"
        element={
          <PrivateRoute>
            <Consultation />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        }
      />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route
        path="/search/:name"
        element={
          <PrivateRoute>
            <Search />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AllRoutes;
