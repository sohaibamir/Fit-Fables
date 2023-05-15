import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./Admin/src/pages/home/Home";
import Login from "./Admin/src/pages/login/Login";
import List from "./Admin/src/pages/list/List";
import Single from "./Admin/src/pages/single/Single";
import New from "./Admin/src/pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./Admin/src/formSource";

function App() {
  return (
    <div>
      <Navbar />
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
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
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
