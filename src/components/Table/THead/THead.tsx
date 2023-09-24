import React, { FC, useState } from "react";
import styles from "./THead.module.scss";
import TrHeader from "./TrHeader/TrHeader";

interface THeadProps {
  columns: string[] | [];
  hiddenColumns: string[];
  sortIcon: JSX.Element;
  sortField: string;

  selectAll: boolean;

  handleSort: (e: React.MouseEvent<HTMLElement>) => void;
  handleSelectAll: (checked:boolean) => void;
}

const THead: FC<THeadProps> = ({
  columns,
  hiddenColumns,
  handleSort,
  sortIcon,
  sortField,
  selectAll,
  handleSelectAll
}) => {
  return (
    <thead className={styles.THead}>
      <TrHeader
        columns={columns}
        hiddenColumns={hiddenColumns}
        handleSort={handleSort}
        sortIcon={sortIcon}
        sortField={sortField}
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
      />
    </thead>
  );
};

export default THead;
