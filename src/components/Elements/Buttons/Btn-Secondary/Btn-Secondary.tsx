import React, { FC } from "react";
import styles from "./Btn-Secondary.module.scss";
import { BtnActionsTextEnum } from "../BtnActionsText";

interface BtnSecondaryProps {
  text: BtnActionsTextEnum | string | undefined
  icon?: React.ReactElement;
  type?: "button" | "submit" | "reset";
  action?: () => void;
}

const BtnSecondary: FC<BtnSecondaryProps> = ({ text, action, icon, type }) => (
  <button type={type ? type : "button"} className={styles.BtnSecondary} onClick={action}>
     {text} {icon}
  </button>
);

export default BtnSecondary;
