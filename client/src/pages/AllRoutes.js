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

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeUser />} />
      <Route exact path="/admin" element={<Home />}>
        <Route exact path="login" element={<Login />} />
        <Route exact path="users">
          <Route index element={<List />} />
          <Route exact path=":userId" element={<Single />} />
          <Route
            exact
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Route>
        <Route path="products">
          <Route index element={<List />} />
          <Route path=":productId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={productInputs} title="Add New Product" />}
          />
        </Route>
      </Route>
      <Route path="/healthcare" element={<Healthcare />} />
      <Route path="/healthcare/products/:cat" element={<Products />}></Route>
    </Routes>
  );
}

export default AllRoutes;
