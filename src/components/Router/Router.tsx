import React, { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import Overview from "../Pages/Overview/Overview";
import Stock from "../Pages/Stock/Stock";
import Clients from "../Pages/Clients/Clients";
interface RouterProps {}

const Router: FC<RouterProps> = () => {
  const location = useLocation().pathname;

  return (
    <Routes>
      {/* Auth */}
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/forgot_password"} element={<ForgotPassword />} />

      {/* Pages */}
      <Route path={"/overview"} element={<Overview />} />
      <Route path={"/stock"} element={<Stock />} />
      <Route path={"/clients"} element={<Clients />} />

      {/* Default */}
      <Route path={location} element={<Overview />} />
    </Routes>
  );
};

export default Router;
