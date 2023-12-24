import React, { FC, SetStateAction } from "react";
import styles from "./TrHead.module.scss";
import Th from "../Table/Thead/Th/Th";

interface TrHeadProps {
  columns: string[];
  hiddens: { hiddens: string[]; setHiddens: React.Dispatch<SetStateAction<string[]>> };
}

const TrHead: FC<TrHeadProps> = ({ columns, hiddens }) => (
  <tr className={styles.TrHead}>
    {columns.map((column) => {
      if (!hiddens.hiddens.includes(column)) {
        return <Th column={column} />;
      }
    })}
  </tr>
);

export default TrHead;
