import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import Overview from "../Pages/Overview/Overview";

interface RouterProps {}

const Router: FC<RouterProps> = () => (
  <Routes>
    {/* Auth */}
    <Route path={"/Login"} element={<Login />} />
    <Route path={"/Register"} element={<Register />} />
    <Route path={"/ForgotPassword"} element={<ForgotPassword />} />

    {/* Pages */}
    <Route path={"/Overview"} element={<Overview />} />
  </Routes>
);

export default Router;
