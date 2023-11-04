import React, { FC } from "react";
import styles from "./SummaryItem.module.scss";
import BtnOutline from "../../Elements/Buttons/Btn-Outline/Btn-Outline";
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";

interface SummaryItemProps {
  keyLabel: string;
  value: string | number;
}

const SummaryItem: FC<SummaryItemProps> = ({ keyLabel, value }) => {

  return (
    <div className={styles.SummaryItem}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h5>{keyLabel}</h5>
        </div>
        <div className={styles.value}>
          <h2>{value}</h2>
        <div className={styles.list}>
          <BtnOutline icon={<HiMiniClipboardDocumentCheck />} text={"View List"} action={() => {}} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryItem;
