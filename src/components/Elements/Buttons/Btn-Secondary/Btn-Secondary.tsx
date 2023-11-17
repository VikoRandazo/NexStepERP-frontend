import React, { FC } from "react";
import styles from "./Btn-Secondary.module.scss";
import { BtnActionsText, BtnActionsTextEnum } from "../BtnActionsText";

interface BtnSecondaryProps {
  text: BtnActionsTextEnum | string;
  icon? : React.ReactElement
  action?: () => void;
}

const BtnSecondary: FC<BtnSecondaryProps> = ({ text, action, icon }) => (
  <button type={"button"} className={styles.BtnSecondary} onClick={action}>
   {icon} {text}
  </button>
);

export default BtnSecondary;
