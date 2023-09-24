import React, { FC } from "react";
import styles from "./TrHeader.module.scss";
import TH from "../TH/TH";
import Checkbox from "../../../Elements/Checkbox/Checkbox";

interface TrHeaderProps {
  columns: string[] | [];
  hiddenColumns: string[];
  handleSort: (e: React.MouseEvent<HTMLElement>) => void
  sortIcon: JSX.Element
  sortField:string
}

const TrHeader: FC<TrHeaderProps> = ({ columns, hiddenColumns, handleSort, sortIcon, sortField }) => {
  return (
    <tr className={styles.TrHeader}>
      <TH column={<Checkbox checked={true} onChange={() => {}} />} />
      {columns.map((column, i) => {
        if (!hiddenColumns.includes(column)) {
          return <TH key={i} column={column} handleSort={handleSort} sortIcon={sortIcon} sortField={sortField} />;
        }
        return null;
      })}
    </tr>
  );
};

export default TrHeader;
