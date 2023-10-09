import React, { FC } from "react";
import styles from "./SummaryItem.module.scss";

interface SummaryItemProps {
  keyLabel: string;
  value: string | number;
}

const SummaryItem: FC<SummaryItemProps> = ({ keyLabel, value }) => {

  return (
    <div className={styles.SummaryItem}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h5>{keyLabel}</h5>
        </div>
        <div className={styles.value}>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default SummaryItem;
