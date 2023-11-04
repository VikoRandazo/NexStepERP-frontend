import React, { FC } from "react";
import styles from "./Main.module.scss";
import Router from "../../Router/Router";
import Modal from "../../Modal/Modal";
import { Form } from "react-router-dom";

interface MainProps {}

const Main: FC<MainProps> = () => (
  <div className={styles.Main}>
    <Router />
  </div>
);

export default Main;
