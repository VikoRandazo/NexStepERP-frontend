import React, { FC, useEffect, useState } from "react";
import styles from "./Table.module.scss";
import THead from "./THead/THead";
import TBody from "./TBody/TBody";
import { useTableHook } from "./UseTableHook";

interface TableProps<T> {
  data: T[];
  cellAction?: (item: T) => void;
  selectedRows: any[];
  setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;
}

const Table = <T extends object>({ data, selectedRows, setSelectedRows }: TableProps<T>) => {
const {selectAll,setSelectAll, prepareTableData, prepareTableColumns} = useTableHook(data)


  const tableData = prepareTableData();
  const tableColumns = prepareTableColumns();


  return (
    <table className={styles.Table}>
      <THead columns={tableColumns || []} selectAll={selectAll} setSelectAll={setSelectAll}/>
      <TBody<T> data={tableData || []} selectedRows={selectedRows} setSelectedRows={setSelectedRows} selectAll={selectAll}/>
    </table>
  );
};

export default Table;
