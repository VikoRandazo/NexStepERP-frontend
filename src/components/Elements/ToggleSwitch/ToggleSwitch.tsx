import React, { FC } from "react";
import styles from "./ToggleSwitch.module.scss";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <div className={checked ? `${styles.ToggleSwitch} ${styles.isChecked}` : styles.ToggleSwitch}>
      <div className={styles.circle}></div>
      <input className={styles.input} type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};

export default ToggleSwitch;
