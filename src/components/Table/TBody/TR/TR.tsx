import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./TR.module.scss";
import Td from "../TD/TD";
import Checkbox from "../../../Elements/Checkbox/Checkbox";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import Select from "../../../Elements/Select/Select";

interface TrProps<T> {
  item: T;
  hiddenColumns: string[];
  selectAll: boolean;
  setSelectedRows: any;
  hasActions: boolean;
  setIsOpenSelectMenu: Dispatch<SetStateAction<boolean>>
  isOpenSelectMenu: boolean
}

const Tr = <T extends object>({
  item,
  hiddenColumns,
  selectAll,
  setSelectedRows,
  hasActions,
  isOpenSelectMenu,
  setIsOpenSelectMenu,
}: TrProps<T>) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const itemId = (item as any)._id;

  const handleCheckbox = (checked: boolean) => {
    setIsChecked(checked);
    handleSelectRows(checked);
  };

  const handleSelectRows = (checked: boolean) => {
    setSelectedRows((prev: any) => {
      if (checked) {
        return [...prev, itemId];
      } else {
        return prev.filter((id: any) => id !== itemId);
      }
    });
  };

  const handleOpenSelectMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsOpenSelectMenu(prev => !prev)
  }

  useEffect(() => {
    setIsChecked(selectAll);
    if (selectAll) {
      setSelectedRows((prev: any) => [...new Set([...prev, itemId])]);
    } else {
      setSelectedRows((prev: any) => prev.filter((id: any) => id !== itemId));
    }
  }, [selectAll]);

  return (
    <tr className={styles.Tr}>
      <Td children={<Checkbox checked={isChecked} onChange={handleCheckbox} />} />

      {Object.entries(item).map(([key, value], i) => {
        if (!hiddenColumns.includes(key)) {
          return <Td key={i} value={value} />;
        }
        return null;
      })}
      {hasActions ? (
        <Td
          value={<div className={styles.container}>
            <span onClick={handleOpenSelectMenu}>
              <HiEllipsisHorizontal />
            </span>
            {isOpenSelectMenu ? <Select isActive={false} options={[]} /> : null}
          </div>
          }
        />
      ) : null}
    </tr>
  );
};

export default Tr;
