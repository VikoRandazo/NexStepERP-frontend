import React, { FC, useState } from "react";
import styles from "./THead.module.scss";
import TrHeader from "./TrHeader/TrHeader";

interface THeadProps {
  columns: string[] | [];
  hiddenColumns: string[];
  handleSort: (e: React.MouseEvent<HTMLElement>) => void
  sortIcon:JSX.Element
  sortField:string
}

const THead: FC<THeadProps> = ({ columns, hiddenColumns, handleSort, sortIcon,sortField }) => {
  return (
    <thead className={styles.THead}>
      <TrHeader columns={columns}  hiddenColumns={hiddenColumns} handleSort={handleSort} sortIcon={sortIcon} sortField={sortField}  />
    </thead>
  );
};

export default THead;
