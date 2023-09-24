import React, { useEffect } from "react";
import styles from "./Table.module.scss";
import THead from "./THead/THead";
import TBody from "./TBody/TBody";
import { useTableHook } from "./UseTableHook";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

interface TableProps<T> {
  data: T[];
  cellAction?: (item: T) => void;
  selectedRows: any[];
  hasActionsColumn: boolean;
  setSelectedRows: React.Dispatch<React.SetStateAction<{ _id: string }[]>>;
}

const Table = <T extends object>({
  data: initData,
  selectedRows,
  setSelectedRows,
  hasActionsColumn,
}: TableProps<T>) => {
  const { init, states, setters, handlers } = useTableHook(initData, hasActionsColumn);

  const { columns } = init;
  const { hiddenColumns, sortedData, sortDirection, sortField, selectAll, isOpenSelectMenu } = states;
  const { handleSort, handleSelectAll } = handlers;
  const { setIsOpenSelectMenu } = setters;

  useEffect(() => {
    console.log(isOpenSelectMenu);
  }, [isOpenSelectMenu]);
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
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
        />
        <TBody<T>
          hiddenColumns={hiddenColumns}
          data={sortedData}
          selectAll={selectAll}
          setSelectedRows={setSelectedRows}
          hasActions={hasActionsColumn}
          setIsOpenSelectMenu={setIsOpenSelectMenu}
          isOpenSelectMenu={isOpenSelectMenu}
        />
      </table>
    </div>
  );
};

export default Table;
