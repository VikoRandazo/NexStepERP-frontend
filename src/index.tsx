import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import googleAuth from "./components/Auth/client_secret_446328549551-3alvbth0amr2ihevs4lf3hbq15a1fmbc.apps.googleusercontent.com.json";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleAuth.web.client_id}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
