import React from "react";
import styles from "./Summary.module.scss";
import SummaryItem from "./SummaryItem/SummaryItem";

interface SummaryProps<T> {
  analysisObject: T[];
}

const Summary = <T,>({ analysisObject }: SummaryProps<T>) => {
  return (
    <div className={styles.Summary}>
      {analysisObject.map((analysis:any, i) => (
        <>
          <hr className={styles.divider} />
          <SummaryItem key={i} summaryItem={analysis}  />
        </>
      ))}
    </div>
  );
};

export default Summary;
