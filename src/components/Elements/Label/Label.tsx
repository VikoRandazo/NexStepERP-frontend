import React, { FC } from "react";
import styles from "./Label.module.scss";

interface LabelProps {
  label: string;
  for: string | undefined
  isFocused?: boolean
}

const Label: FC<LabelProps> = ({ label, isFocused }) => {

  return(
    <label htmlFor={label} className={isFocused ? `${styles.Label} ${styles.focused}` : styles.Label}>{label}</label>
    )
};

export default Label;
