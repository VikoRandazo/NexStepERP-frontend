import React, { FC, ReactElement } from "react";
import styles from "./Btn-Outline.module.scss";

interface BtnOutlineProps {
  icon?: ReactElement;
  text: string;
  action: () => void;
  disabled?: boolean;
}

const BtnOutline: FC<BtnOutlineProps> = ({ icon, text, disabled, action }) => (
  <button type={"button"} className={disabled ? `${styles.BtnOutline} ${styles.disabled}` : styles.BtnOutline} disabled={disabled} onClick={action}>
    <span className={styles.icon}>{icon}</span>
    { disabled ? null :<span className={styles.text}>{text}</span>}
  </button>
);

export default BtnOutline;
