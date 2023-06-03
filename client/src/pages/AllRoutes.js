import React from "react";
import Login from "../Admin/src/pages/login/Login";
import List from "../Admin/src/pages/list/List";
import ProductList from "../Admin/src/pages/list/ProductList";
import Single from "../Admin/src/pages/single/Single";
import New from "../Admin/src/pages/new/New";
import HomeUser from "../components/home/HomeUser";
import { Route, Routes } from "react-router-dom";
import Home from "../Admin/src/pages/home/Home";
import { doctorInputs, productInputs } from "../Admin/src/formSource";
import Healthcare from "./Healthcare";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Orders from "../Admin/src/pages/orders/Orders";
import Cart from "./Cart";
import Search from "./Search";
import Delivery from "./Delivery";
import Doctors from "../Admin/src/pages/doctors/Doctors";
import Offers from "./Offers";

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
      <Route path="/admin/:productId" element={<Single />} />

      <Route
        path="/admin/new/product"
        element={<New inputs={productInputs} title="Add New Product" />}
      />
      <Route
        exact
        path="/admin/new/doctor"
        element={<New inputs={doctorInputs} title="Add New Doctor" />}
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
