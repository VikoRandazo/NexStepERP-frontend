import React, { SetStateAction } from "react";
import styles from "./Tr.module.scss";
import Td from "../Tbody/Td/Td";

interface TrProps<T> {
  row: T;
  onChange_selectRow: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hiddens: {
    hiddens: string[];
    setHiddens: React.Dispatch<SetStateAction<string[]>>;
  };
  setSelectedRows: React.Dispatch<SetStateAction<string[]>>;
}

const Tr = <T extends { id: string }>({
  row,
  onChange_selectRow,
  hiddens,
  setSelectedRows,
}: TrProps<T>) => {
  const handleSendEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    onChange_selectRow(e);

    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(row.id);
      } else {
        newSet.delete(row.id);
      }
      return Array.from(newSet);
    });
  };

  return (
    <tr className={styles.Tr}>
      <Td>
        <input type="checkbox" name="selectRow" onChange={handleSendEvent} />
      </Td>
      {Object.entries(row).map(([key, value]) => {
        if (!hiddens.hiddens.includes(key)) {
          return <Td>{value as string}</Td>;
        }
      })}
    </tr>
  );
};

export default Tr;
