import React, { FC } from "react";
import styles from "./Btn-Secondary.module.scss";
import { BtnActionsText } from "../BtnActionsText";

interface BtnSecondaryProps {
  text: BtnActionsText;
  action?: () => void;
}

const BtnSecondary: FC<BtnSecondaryProps> = ({ text, action }) => (
  <button className={styles.BtnSecondary} onClick={action}>
    {text}
  </button>
);

export default BtnSecondary;
