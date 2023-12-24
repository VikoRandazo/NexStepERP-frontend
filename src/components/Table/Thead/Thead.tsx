import React, { FC, SetStateAction } from "react";
import styles from "./Thead.module.scss";
import Th from "./Th/Th";
import { TableColumn } from "../TableColumn";
import Tr from "../Tr/Tr";
import TrHead from "../../TrHead/TrHead";

interface TheadProps {
  columns: string[];
  hiddens: { hiddens: string[]; setHiddens: React.Dispatch<SetStateAction<string[]>> };
}

const Thead: FC<TheadProps> = ({ columns, hiddens }) => {
  const addCheckboxColumn = ["", ...columns];

  return (
    <thead className={styles.Thead}>
      <TrHead columns={addCheckboxColumn} hiddens={hiddens}/>
    </thead>
  );
};

export default Thead;
