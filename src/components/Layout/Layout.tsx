import React, { FC, useEffect } from "react";
import styles from "./Layout.module.scss";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import SideBar from "./SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";
import { sideBarActions } from "../../store/slices/sideBar";
import Login from "../Auth/Login/Login";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  const isExpandedSideBar = useSelector((state: StoreRootTypes) => state.sideBarSlice.isExpanded);
  const user_verified = useSelector((state: StoreRootTypes) => state.userAuth.user_verified);
  return (
    <div className={styles.Layout}>
      {user_verified ? (
        <>
          <div
            className={
              isExpandedSideBar ? styles.sidebar : `${styles.sidebar} ${styles.isExpanded}`
            }
          >
            <SideBar />
          </div>
          <div className={styles.layoutContainer}>
            <div className={styles.header}>
              <Header />
            </div>

            <div className={styles.main}>
              <Main />
            </div>
          </div>
        </>
      ) : (
        <Main />
      )}
    </div>
  );
};

export default Layout;
