import React, { FC, ReactElement } from "react";
import styles from "./Btn-Transparent.module.scss";

interface BtnTransparentProps {
  text?: string;
  icon?: ReactElement;
  action: () => void;
}

const BtnTransparent: FC<BtnTransparentProps> = ({ action, text, icon }) => (
  <button className={styles.BtnTransparent} onClick={action}>
    {text} {icon}
  </button>
);

export default BtnTransparent;
