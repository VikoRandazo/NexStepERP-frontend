/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { FC, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { HiChatBubbleOvalLeftEllipsis, HiMiniBell } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { CustomerType } from "../../../models/CustomerType";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const currentPage = useSelector((state: StoreRootTypes) => state.appSettings.pageName);

  return (
    <div className={styles.Header}>
      <div className={styles.title}>
        <h2>{currentPage}</h2>
      </div>
      <div className={styles.user}>
        <div className={styles.system}>
          <div className={styles.notifications}>
            <HiMiniBell />
          </div>
          <div className={styles.messages}>
            <HiChatBubbleOvalLeftEllipsis />
          </div>
        </div>
        <div className={styles.userImg}>
          <img src="https://did.li/akHCN" />
        </div>
        <div className={styles.userDetails}>
          <h5>user name</h5>
          <span>demo@example.com</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
