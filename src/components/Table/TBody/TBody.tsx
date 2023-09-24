import React from "react";
import styles from "./TBody.module.scss";
import TR from "./TR/TR";

interface TBodyProps<T> {
  data: T[];
  hiddenColumns: string[]
}

const TBody = <T extends object>({
  data,hiddenColumns
}: TBodyProps<T>) => {

  
  return (
    <tbody className={styles.TBody}>
      {data.map((item: T, i) => {
        return (
          <TR<T>
            key={i}
            item={item}
            hiddenColumns = {hiddenColumns}
          />
        );
      })}
    </tbody>
  );
};

export default TBody;
