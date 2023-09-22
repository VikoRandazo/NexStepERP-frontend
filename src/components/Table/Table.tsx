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
const [hiddenColumns, setHiddenColumns] = useState<string[]>([`_id`, `imageUrl`, `category`])

  const prepareTableData = () => {
    const items = data.map((item) => {
      return Object.entries(item)
        .filter(([key]) => !hiddenColumns.includes(key))
        .reduce((acc: any, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    });
    return items;
  };

  const prepareTableColumns = () => {
    console.log(data[0]);
    const item = data[0];
    const itemKeys = Object.entries(item);
    const mappedKeys = itemKeys.map(([key]) => key);
    const filterKeys = mappedKeys.filter((key) => !hiddenColumns.includes(key))
    console.log(mappedKeys);
    return filterKeys;
  };

  const tableData = prepareTableData();

  const tableColumns = prepareTableColumns();

  return (
    <table className={styles.Table}>
      <THead columns={tableColumns} />
      <TBody<T> data={tableData} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
    </table>
  );
};

export default Table;
