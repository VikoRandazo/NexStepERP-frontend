import React, { FC } from "react";
import styles from "./Divider.module.scss";

interface DividerProps {
  text?: string;
}

const Divider: FC<DividerProps> = ({ text }) => (
  <div className={styles.Divider}>
    <span>{text}</span>
    <hr />
  </div>
);

export default Divider;
