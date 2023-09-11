import React, { FC } from "react";
import styles from "./Label.module.scss";

interface LabelProps {
  key: string;
}

const Label: FC<LabelProps> = ({ key }) => {

  return(
    <label className={styles.Label}>{key}</label>
    )
};

export default Label;
