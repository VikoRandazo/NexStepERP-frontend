import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./TR.module.scss";
import Td from "../TD/TD";
import Checkbox from "../../../Elements/Checkbox/Checkbox";

interface TrProps<T> {
  item: T;
  selectedRows: any;
  setSelectedRows:any;
}

const Tr = <T extends object>({ item, selectedRows, setSelectedRows }: TrProps<T>) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = useCallback(
    (checked: boolean) => {
      setIsChecked(checked);

      setSelectedRows((prev: T[]) => {
        const newSet:Set<T> = new Set(prev);

        if (checked) {
          newSet.add((item as any)._id);
        } else {
          newSet.delete((item as any)._id);
        }
        return [...newSet]
      });
    },
    [item]
  );

  return (
    <tr className={styles.Tr}>
      <Td children={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />} />

      {Object.values(item).map((value, i) => {
        return <Td key={i} value={value} />;
      })}
    </tr>
  );
};

export default Tr;
