import React, { FC, useEffect, useState } from "react";
import styles from "./TBody.module.scss";
import TR from "./TR/TR";

interface TBodyProps<T> {
  data: T[];
  selectedRows: any
  setSelectedRows:React.Dispatch<React.SetStateAction<T[]>>
}

const TBody = <T extends object>({ data, selectedRows, setSelectedRows }: TBodyProps<T>) => {

  return (
    <tbody className={styles.TBody}>
      {data.map((item: T, i) => {
        return (
          <TR<T>
            key={i}
            item={item}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        );
      })}
    </tbody>
  );
};

export default TBody;
