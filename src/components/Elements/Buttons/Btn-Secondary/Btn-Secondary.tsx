import React, { FC } from "react";
import styles from "./Btn-Secondary.module.scss";
import { BtnActionsText, BtnActionsTextEnum } from "../BtnActionsText";

interface BtnSecondaryProps {
  text: BtnActionsTextEnum;
  action?: () => void;
}

const BtnSecondary: FC<BtnSecondaryProps> = ({ text, action }) => (
  <button type={"button"}className={styles.BtnSecondary} onClick={action}>
    {text}
  </button>
);

export default BtnSecondary;
