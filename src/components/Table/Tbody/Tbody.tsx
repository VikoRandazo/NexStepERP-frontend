import React, { FC, SetStateAction } from "react";
import styles from "./Tbody.module.scss";
import Tr from "../Tr/Tr";

interface TbodyProps<T> {
  rows: T[];
  onChange_selectRow: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hiddens: {
    hiddens: string[];
    setHiddens: React.Dispatch<SetStateAction<string[]>>;
  };
  setSelectedRows: React.Dispatch<SetStateAction<string[]>>;
}

const Tbody = <T extends {id: string}>({ rows, onChange_selectRow, hiddens, setSelectedRows }: TbodyProps<T>) => (
  <tbody className={styles.Tbody}>
    {rows.map((row) => {
      return (
        <Tr
          row={row}
          onChange_selectRow={onChange_selectRow}
          hiddens={hiddens}
          setSelectedRows={setSelectedRows}
        />
      );
    })}
  </tbody>
);

export default Tbody;
