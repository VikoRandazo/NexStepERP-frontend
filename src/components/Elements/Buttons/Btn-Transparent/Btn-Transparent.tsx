import React, { FC } from "react";
import styles from "./Btn-Transparent.module.scss";

interface BtnTransparentProps {
  children: any;
  action: () => void;
}

const BtnTransparent: FC<BtnTransparentProps> = ({ children, action }) => (
  <button className={styles.BtnTransparent} onClick={action}>
    {children}
  </button>
);

export default BtnTransparent;
