import React, { FC } from "react";
import styles from "./Summary.module.scss";
import { useSummaryHook } from "./UseSummaryHook";
import SummaryItem from "./SummaryItem/SummaryItem";

interface SummaryProps {
  summaryObject: { keys: { [key: string]: string }; values: { [key: string]: any } };
}

const Summary: FC<SummaryProps> = ({ summaryObject }) => {
  const { keys, values } = summaryObject;
  return (
    <div className={styles.Summary}>
      {Object.entries(values).map(([itemKey, value], i) => {
        const keyLabel = keys[itemKey];
        return (
          <>
          <hr className={styles.divider} />
            <SummaryItem key={i} keyLabel={keyLabel} value={value} />
          </>
        );
      })}
    </div>
  );
};

export default Summary;
