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
import Chat from "../Pages/Chat/Chat";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

interface RouterProps {}

const Router: FC<RouterProps> = () => {
  const { pathname } = useLocation();
  const { dispatch } = useDispatchHook();

  const formatPathname = () => {
    const removeFirstLetter = pathname.split(`/`)[1].slice(1);
    const uppercaseFirstLetter = pathname.split(`/`)[1][0].toUpperCase();

    const formattedPathname = uppercaseFirstLetter + removeFirstLetter;

    console.log(formattedPathname);
      
      dispatch(appSettingsActions.setPageName(formattedPathname));
  };

  useEffect(() => {
    if (pathname !== `/`) {
      formatPathname();
    }
  }, [pathname]);

  return (
    <Routes>
      {/* Auth */}
      <Route path={"/Login"} element={<Login />} />
      <Route path={"/Register"} element={<Register />} />
      <Route path={"/forgot_password"} element={<ForgotPassword />} />

      {/* Pages */}
      <Route
        path={"/Overview"}
        element={
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        }
      />
      <Route
        path={"/Products"}
        element={
          <ProtectedRoute>
            <Stock />
          </ProtectedRoute>
        }
      />
      <Route
        path={"/Clients"}
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />
      <Route
        path={"/Sales"}
        element={
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
        }
      />
      <Route
        path={"/Messages"}
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      {/* checkout */}
      <Route
        path={"/Checkout"}
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* Default */}
      <Route
        path={"/"}
        element={
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
