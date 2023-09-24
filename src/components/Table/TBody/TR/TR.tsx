import React, { useEffect, useState } from "react";
import styles from "./TR.module.scss";
import Td from "../TD/TD";
import Checkbox from "../../../Elements/Checkbox/Checkbox";

interface TrProps<T> {
  item: T;
  hiddenColumns: string[];
}

const Tr = <T extends object>({ item, hiddenColumns }: TrProps<T>) => {
  const itemId = (item as any)._id;

  return (
    <tr className={styles.Tr}>
      <Td children={<Checkbox checked={true} onChange={() => {}} />} />

      {Object.entries(item).map(([key, value], i) => {
        if (!hiddenColumns.includes(key)) {
          return <Td key={i} value={value} />;
        }
        return null;
      })}
    </tr>
  );
};

export default Tr;
