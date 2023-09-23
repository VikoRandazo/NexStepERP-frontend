import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./TR.module.scss";
import Td from "../TD/TD";
import Checkbox from "../../../Elements/Checkbox/Checkbox";

interface TrProps<T> {
  item: T;
  selectedRows: any;
  setSelectedRows: any;
  selectAll: boolean;
}

const Tr = <T extends object>({ item, selectedRows, setSelectedRows, selectAll }: TrProps<T>) => {
  const [isChecked, setIsChecked] = useState(selectAll);

  const handleChangeCheckbox = (checked: boolean) => {
    setIsChecked(checked)

    setSelectedRows((prev: T[]) => {
      const selectedRowsSet = new Set(prev);
      if (checked) {
        selectedRowsSet.add((item as any).name);
      } else {
        selectedRowsSet.delete((item as any).name);
      }
      return [...selectedRowsSet];
    });
  };

  useEffect(() => {
    setIsChecked(selectAll)
  }, [selectAll]);

  return (
    <tr className={styles.Tr}>
      <Td children={<Checkbox checked={isChecked} onChange={handleChangeCheckbox} />} />

      {Object.values(item).map((value, i) => {
        return <Td key={i} value={value} />;
      })}
    </tr>
  );
};

export default Tr;
