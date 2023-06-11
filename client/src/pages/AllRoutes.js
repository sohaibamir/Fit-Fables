import React from "react";
import Login from "../Admin/src/pages/login/Login";
import List from "../Admin/src/pages/list/List";
import ProductList from "../Admin/src/pages/list/ProductList";
import Single from "../Admin/src/pages/single/Single";
import NewOrEditProduct from "../Admin/src/pages/newOrEditProduct/NewOrEditProduct";
import HomeUser from "../components/home/HomeUser";
import { Route, Routes } from "react-router-dom";
import Home from "../Admin/src/pages/home/Home";
import { doctorInputs, orderInputs, productInputs } from "../Admin/src/formSource";
import Healthcare from "./Healthcare";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Orders from "../Admin/src/pages/orders/Orders";
import Cart from "./Cart";
import Search from "./Search";
import Delivery from "./Delivery";
import Doctors from "../Admin/src/pages/doctors/Doctors";
import Offers from "./Offers";
import NewOrEditDoctor from "../Admin/src/pages/newOrEditDoctor/NewOrEditDoctor";
import ViewOrderDetails from "../Admin/src/pages/viewOrderDetails/ViewOrderDetails";

function AllRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<HomeUser />} />
      <Route exact path="/admin" element={<Home />} />
      <Route exact path="/admin/login" element={<Login />} />

      <Route path="/admin/users" element={<List />} />
      <Route exact path="/admin/:userId" element={<Single />} />
      {/* <Route
        exact
        path="/admin/new/user"
        element={<New inputs={userInputs} title="Add New User" />}
      /> */}

      <Route path="/admin/products" element={<ProductList />} />

      <Route
        path="/admin/new/product"
        element={<NewOrEditProduct inputs={productInputs} title="Add New Product" />}
      />

      <Route
        path="/admin/product/:productId"
        element={<NewOrEditProduct inputs={productInputs} title="Edit Product Details" />}
      />

      <Route
        exact
        path="/admin/new/doctor"
        element={<NewOrEditDoctor inputs={doctorInputs} title="Add New Doctor" />}
      />
      <Route
        path="/admin/doctors/:doctorId"
        element={<NewOrEditDoctor inputs={doctorInputs} title="Edit Doctor Details" />}
      />

      <Route
        path="/admin/orders/:orderId"
        element={<ViewOrderDetails inputs={orderInputs} title="Order Details" />}
      />

      <Route path="/healthcare" element={<Healthcare />} />
      <Route path="/Offers" element={<Offers />} />
      <Route path="/healthcare/products/:cat" element={<Products />} />
      <Route path="/healthcare/product/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/search/:name" element={<Search />} />
      <Route path="/admin/doctors" element={<Doctors />} />
    </Routes>
  );
}

export default AllRoutes;
