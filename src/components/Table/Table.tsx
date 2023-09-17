import React, { FC } from "react";
import styles from "./Table.module.scss";

interface TableProps {
  columns: string[];
  data: any[];
}

const Table: FC<TableProps> = ({ columns, data }) => {
  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          <th>
            <div className={styles.checkboxTh}></div>
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
              <tr key={index}>
                <td>
                <input className={styles.c} type="checkbox" name="selectedRow" />
                </td>
                {Object.values(item).map((value: any, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default Table;
