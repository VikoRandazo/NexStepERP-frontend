import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import Overview from "../Pages/Overview/Overview";
import Stock from "../Pages/Stock/Stock";

interface RouterProps {}

const Router: FC<RouterProps> = () => (
  <Routes>
    {/* Auth */}
    <Route path={"/login"} element={<Login />} />
    <Route path={"/register"} element={<Register />} />
    <Route path={"/forgot_password"} element={<ForgotPassword />} />

    {/* Pages */}
    <Route path={"/overview"} element={<Overview />} />
    <Route path={"/stock"} element={<Stock />} />

    {/* default */}
    <Route path={"/"} element={<Overview />} />
  </Routes>
);

export default Router;
