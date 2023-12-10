import React, { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import Overview from "../Pages/Overview/Overview";
import Stock from "../Pages/Stock/Stock";
import Clients from "../Pages/Clients/Clients";
import Checkout from "../Pages/Checkout/Checkout";
interface RouterProps {}

const Router: FC<RouterProps> = () => {

  return (
    <Routes>

      {/* Auth */}
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/forgot_password"} element={<ForgotPassword />} />

      {/* Pages */}
      <Route path={"/overview"} element={<Overview />} />
      <Route path={"/products"} element={<Stock />} />
      <Route path={"/clients"} element={<Clients />} />
      <Route path={"/checkout"} element={<Checkout />} />

      {/* Default */}
      <Route path={"/"} element={<Overview />} />
    </Routes>
  );
};

export default Router;
