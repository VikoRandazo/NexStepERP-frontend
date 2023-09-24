import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import THead from "./THead/THead";
import TBody from "./TBody/TBody";
import { useTableHook } from "./UseTableHook";
import { HiBarsArrowDown, HiBarsArrowUp, HiChevronDown, HiChevronUp } from "react-icons/hi2";

interface TableProps<T> {
  data: T[];
  cellAction?: (item: T) => void;
  selectedRows: any[];
  setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;
}

const Table = <T extends object>({
  data: initData,
  selectedRows,
  setSelectedRows,
}: TableProps<T>) => {
  const { init, states, setStateActions, handlers } = useTableHook(initData);

  const { columns } = init;
  const { hiddenColumns, sortedData, sortDirection, sortField } = states;
  const { handleSort } = handlers;
  return (
    <div className={styles.tableContainer}>
      <div className={styles.actionsBar}>
        <div className={styles.hiddenColumns}></div>
      </div>
      <table className={styles.Table}>
        <THead
          columns={columns || []}
          hiddenColumns={hiddenColumns}
          handleSort={handleSort}
          sortIcon={sortDirection === `asc` ? <HiChevronUp /> : <HiChevronDown />}
          sortField={sortField}
        />
        <TBody<T> hiddenColumns={hiddenColumns} data={sortedData} />
      </table>
    </div>
  );
};

export default Table;
