import React, { FC, SetStateAction } from "react";
import styles from "./Table.module.scss";
import Thead from "./Thead/Thead";
import Tbody from "./Tbody/Tbody";
import { useTable } from "./useTable";

interface TableProps<T> {
  columns: string[];
  valueRows: T[];
  onChange_selectRow: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedRows: React.Dispatch<SetStateAction<string[]>>;
}

const Table = <T extends { id: string }>({
  columns,
  valueRows,
  onChange_selectRow,
  setSelectedRows,
}: TableProps<T>) => {
  const { states, setters } = useTable(columns, valueRows);
  const { hiddens } = states;
  const { setHiddens } = setters;

  const hiddenEntries = {
    hiddens,
    setHiddens,
  };

  return (
    <table className={styles.Table}>
      <Thead columns={columns} hiddens={hiddenEntries} />
      <Tbody
        rows={valueRows}
        onChange_selectRow={onChange_selectRow}
        hiddens={hiddenEntries}
        setSelectedRows={setSelectedRows}
      />
    </table>
  );
};

export default Table;
