import React, { FC } from "react";
import styles from "./TH.module.scss";

interface ThProps {
  column: string | JSX.Element;
}

const Th: FC<ThProps> = ({column}) => (
  <th className={styles.Th} >
    <div className={styles.container}>
      <span>{column}</span>
    </div>
  </th>
);

export default Th;
