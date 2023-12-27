import React, { FC, SetStateAction } from "react";
import styles from "./Checkbox.module.scss";
import { HiCheckBadge } from "react-icons/hi2";

interface CheckboxProps {
  check: boolean;
  setCheck: React.Dispatch<SetStateAction<boolean>>;
  event: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ check, setCheck, event }) => {
  const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    setCheck((prev) => !prev);
    event(e);
  };

  return (
    <div className={styles.Checkbox}>
      <div
        className={check ? `${styles.element} ${styles.isActive}` : styles.element}
        onClick={handleChange}
        data-check={check}
      >
        <HiCheckBadge />
      </div>
    </div>
  );
};

export default Checkbox;
