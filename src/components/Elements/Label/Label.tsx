import React, { FC } from "react";
import styles from "./Label.module.scss";

interface LabelProps {
  label: string;
  for: string
}

const Label: FC<LabelProps> = ({ label }) => {

  return(
    <label htmlFor={label} className={styles.Label}>{label}</label>
    )
};

export default Label;
