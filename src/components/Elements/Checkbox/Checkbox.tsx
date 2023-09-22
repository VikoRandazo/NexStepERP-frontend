import React, { FC } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  checked?: boolean;
  onChange: any;
}

const Checkbox: FC<CheckboxProps> = ({ checked = false, onChange }) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className={styles.Checkbox}>
      <input type="checkbox" onChange={handleToggle} checked={checked} />
      <span className={styles.slider} />
    </label>
  );
};

export default Checkbox;
