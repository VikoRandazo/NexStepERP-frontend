import React, { FC } from "react";
import styles from "./TrHeader.module.scss";
import TH from "../TH/TH";
import Checkbox from "../../../Elements/Checkbox/Checkbox";
import { StoreRootTypes } from "../../../../store/store";

interface TrHeaderProps {
  columns: string[] | [];

  hiddenColumns: string[];

  sortIcon: JSX.Element;
  sortField: string;

  selectAll:boolean;

  handleSort: (e: React.MouseEvent<HTMLElement>) => void;
  handleSelectAll: (checked: boolean) => void;
}

const TrHeader: FC<TrHeaderProps> = ({
  columns,
  hiddenColumns,
  sortIcon,
  sortField,

  selectAll,

  handleSort,
  handleSelectAll,
}) => {
  return (
    <tr className={styles.TrHeader}>
      <TH column={<Checkbox checked={selectAll} onChange={handleSelectAll} />} />
      {columns.map((column, i) => {
        if (!hiddenColumns.includes(column)) {
          return (
            <TH
              key={i}
              column={column}
              handleSort={handleSort}
              sortIcon={sortIcon}
              sortField={sortField}
            />
          );
        }
        return null;
      })}
    </tr>
  );
};

export default TrHeader;
