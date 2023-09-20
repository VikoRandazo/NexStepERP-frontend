import React, { FC, useEffect, useState } from "react";
import styles from "./Table.module.scss";

interface TableProps {
  columns: string[];
  data: any[];
  deleteUrl?: string;
  selectedRows?: Set<any>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<any>>>;
  cellAction?: () => void
}

const Table: FC<TableProps> = ({ columns, data, selectedRows, setSelectedRows, cellAction }) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>, row: any) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (e.target.checked) {
        newSelectedRows.add(row);
      } else {
        newSelectedRows.delete(row);
      }
      return newSelectedRows;
    });
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(e.target.checked);
  };

  useEffect(() => {
    if (selectAll) {
      setSelectedRows(new Set(data.map((item) => item._id)));
    } else {
      setSelectedRows(new Set());
    }
  }, [selectAll, data]);

  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          <th>
            <div className={styles.checkboxTh}>
              <input
                onChange={handleSelectAllChange}
                checked={selectAll}
                type="checkbox"
                className={styles.checkboxTH}
              />
            </div>
          </th>
          {columns.map((column, index) => {
            return (
              <th key={index} className={styles.column}>
                <p className={styles.columnName}>{column}</p>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((item, index) => (
              <tr
                key={index}
                className={
                  selectedRows?.has(item._id)
                    ? `${styles.rowTd} ${styles.selectedRow}`
                    : styles.rowId
                }
              >
                <td>
                  <input
                    onChange={(e) => handleSelection(e, item._id)}
                    className={styles.checkboxTD}
                    type="checkbox"
                    name="selectedRow"
                    checked={selectAll ? selectedRows?.has(item._id) : selectedRows?.has(item._id)}
                  />
                </td>
                {Object.entries(item).map(([key, value]: any, index) => {
                  console.log(item, key, value);

                  return (
                    <td
                      key={index}
                      onClick={cellAction}
                      className={`${styles.tdCell} ${styles[key]}`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default Table;
