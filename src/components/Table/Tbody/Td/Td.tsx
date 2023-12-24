import React, { FC } from "react";
import styles from "./Td.module.scss";

interface TdProps {
  children: React.ReactNode;
}

const Td: FC<TdProps> = ({ children }) => <td className={styles.Td}>{children}</td>;

export default Td;
