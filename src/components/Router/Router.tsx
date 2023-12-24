import React, { FC, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import Overview from "../Pages/Overview/Overview";
import Stock from "../Pages/Stock/Stock";
import Clients from "../Pages/Clients/Clients";
import Checkout from "../Pages/Checkout/Checkout";
import Sales from "../Pages/Sales/Sales";
import { useDispatchHook } from "../../hooks/useDispatch";
import { appSettingsActions } from "../../store/slices/appSettings";
import { PagesNames } from "../../models/pagesName";
import Chat from "../Pages/Chat/Chat";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";

interface RouterProps {}

const Router: FC<RouterProps> = () => {
  const { pathname } = useLocation();
  const { dispatch } = useDispatchHook();
  const navigate = useNavigate();

  const [pagePathName, setPagePathName] = useState<string>("/");

  useEffect(() => {
    dispatch(appSettingsActions.setPageName(pagePathName as PagesNames));
  }, [pagePathName]);

  const verified_user = useSelector((state: StoreRootTypes) => state.userAuth.user_verified);

  return (
    <Routes>
      {/* Auth */}
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/forgot_password"} element={<ForgotPassword />} />

      {/* Pages */}
      <Route path={"/overview"} element={verified_user ? <Overview /> : <Login />} />
      <Route path={"/products"} element={verified_user ? <Stock /> : <Login />} />
      <Route path={"/clients"} element={verified_user ? <Clients /> : <Login />} />
      <Route path={"/sales"} element={verified_user ? <Sales /> : <Login />} />
      <Route path={"/Messages"} element={verified_user ? <Chat /> : <Login />} />

      {/* checkout */}
      <Route path={"/checkout"} element={verified_user ? <Checkout /> : <Login />} />

      {/* Default */}
      <Route path={"/"} element={<Login />} />
    </Routes>
  );
};

export default Router;
