import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "./TR.module.scss";
import Td from "../TD/TD";
import Checkbox from "../../../Elements/Checkbox/Checkbox";
import Select from "../../../Elements/Select/Select";
import { useTr } from "./useTr";
import {
  HiArrowsPointingOut,
  HiEllipsisHorizontal,
  HiTrash,
  HiWrenchScrewdriver,
} from "react-icons/hi2";

interface TrProps<T> {
  item: T;
  hiddenColumns: string[];
  selectAll: boolean;
  setSelectedRows: any;
  hasActions: boolean;
  setIsOpenSelectMenu: Dispatch<SetStateAction<boolean>>;
  isOpenSelectMenu: boolean;
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
  const { isChecked, handleCheckbox, handleOpenSelectMenu, isActiveSelectMenu } = useTr(
    item,
    setSelectedRows,
    setIsOpenSelectMenu,
    selectAll
  );

  const actions = [
    {
      name: `Open`,
      icon: <HiArrowsPointingOut />,
      action: () => {
        console.log("open");
      },
    },
    {
      name: `Edit`,
      icon: <HiWrenchScrewdriver />,
      action: () => {
        console.log("edit");
      },
    },
    {
      name: `Delete`,
      icon: <HiTrash />,
      action: () => {
        console.log("delete");
      },
    },
  ];

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
          value={
            <div className={styles.actionsMenu}>
              <span onClick={handleOpenSelectMenu}>
                <HiEllipsisHorizontal />
              </span>
              {isOpenSelectMenu ? <Select isActive={isActiveSelectMenu} options={actions} /> : null}
            </div>
          }
        />
      ) : null}
    </tr>
  );
};

export default Tr;
