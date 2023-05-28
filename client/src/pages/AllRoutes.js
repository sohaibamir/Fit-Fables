import React from "react";
import Login from "../admin/src/pages/login/Login";
import List from "../admin/src/pages/list/List";
import Single from "../admin/src/pages/single/Single";
import New from "../admin/src/pages/new/New";
import HomeUser from "../components/home/HomeUser";
import { Route, Routes } from "react-router-dom";
import Home from "../admin/src/pages/home/Home";
import { productInputs, userInputs } from "../admin/src/formSource";
import Healthcare from "./Healthcare";
import Products from "./Products";
import SingleProduct from "./SingleProduct";

function AllRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<HomeUser />} />
      <Route exact path="/admin" element={<Home />} />
      <Route exact path="/admin/login" element={<Login />} />

      <Route path="/admin/users" element={<List />} />
      <Route exact path="/admin/:userId" element={<Single />} />
      <Route
        exact
        path="/admin/new/user"
        element={<New inputs={userInputs} title="Add New User" />}
      />

      <Route path="/admin/products" element={<List />} />
      <Route path="/admin/:productId" element={<Single />} />
      <Route
        path="/admin/new/product"
        element={<New inputs={productInputs} title="Add New Product" />}
      />

      <Route path="/healthcare" element={<Healthcare />} />
      <Route path="/healthcare/products/:cat" element={<Products />} />
      <Route path="/healthcare/product/:id" element={<SingleProduct />} />
    </Routes>
  );
}

export default AllRoutes;
