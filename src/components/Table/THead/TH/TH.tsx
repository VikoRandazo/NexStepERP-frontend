import React, { FC } from "react";
import styles from "./TH.module.scss";

interface ThProps {
  column: string | JSX.Element | null;
  handleSort?: (e: React.MouseEvent<HTMLElement>) => void;
  sortIcon?: JSX.Element;
  sortField?: string;
}

const Th: FC<ThProps> = ({ column, handleSort, sortIcon, sortField }) => {
  return (
    <th className={styles.Th}>
      <div className={styles.container}>
        {column === sortField ? <span className={styles.icon}>{sortIcon}</span> : null}
        <span onClick={handleSort}>{column}</span>
      </div>
    </th>
  );
};

export default Th;
