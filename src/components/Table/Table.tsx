import React, { FC, useEffect, useState } from "react";
import styles from "./Table.module.scss";
import THead from "./THead/THead";
import TBody from "./TBody/TBody";
import { useTableHook } from "./UseTableHook";

interface TableProps<T> {
  columns: string[];
  data: T[];
  cellAction?: (item: T) => void;
  selectedRows: any[];
  setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;
}

const Table = <T extends object>({
  columns,
  data,
  selectedRows,
  setSelectedRows,
}: TableProps<T>) => {
  const { acceptColumns } = useTableHook(columns);

  return (
    <table className={styles.Table}>
      <THead columns={acceptColumns()} />
      <TBody<T> data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
    </table>
  );
};

export default Table;
