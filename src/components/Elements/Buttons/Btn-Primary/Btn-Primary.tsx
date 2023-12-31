import React, { FC, ReactElement } from "react";
import styles from "./Btn-Primary.module.scss";

interface BtnPrimaryProps {
  icon?: ReactElement;
  text: string | undefined;
  action?: () => void;
}

const BtnPrimary: FC<BtnPrimaryProps> = ({ icon, text, action }) => {
  return (
    <button type="submit" className={styles.BtnPrimary} onClick={action}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default BtnPrimary;
