import React, { FC, useEffect, useState } from "react";
import styles from "./THead.module.scss";
import TrHeader from "./TrHeader/TrHeader";

interface THeadProps {
  columns: string[] | [];
  selectAll: boolean;
  setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
}

const THead: FC<THeadProps> = ({ columns, selectAll, setSelectAll }) => {
  const handleSelectAll = (checked:boolean) => {
    setSelectAll(checked);
  };

  return (
    <thead className={styles.THead}>
      <TrHeader columns={columns} selectAll={selectAll} handleSelectAll={handleSelectAll} />
    </thead>
  );
};

export default THead;
