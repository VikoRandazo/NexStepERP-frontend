import React, { FC, useEffect, useState } from "react";
import styles from "./THead.module.scss";
import TrHeader from "./TrHeader/TrHeader";
import { TableColumn } from "../TableModels";

interface THeadProps {
  columns: TableColumn[];
}

const THead: FC<THeadProps> = ({ columns }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };
  return (
    <thead className={styles.THead}>
      <TrHeader columns={columns} selectAll={isChecked} handleSelectAll={handleCheckboxChange}/>
    </thead>
  );
};

export default THead;
