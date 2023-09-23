import React, { FC } from "react";
import styles from "./TrHeader.module.scss";
import TH from "../TH/TH";
import Checkbox from "../../../Elements/Checkbox/Checkbox";

interface TrHeaderProps {
  columns: string[] | [];
  selectAll: boolean;
  handleSelectAll: any;
}

const TrHeader: FC<TrHeaderProps> = ({ columns, selectAll, handleSelectAll }) => {

  
  return (
    <tr className={styles.TrHeader}>
      <TH column={<Checkbox checked={selectAll} onChange={handleSelectAll}/>} />
      {columns.map((column, i) => {
        return <TH key={i} column={column} />;
      })}
    </tr>
  );
};

export default TrHeader;
