import React, { FC, useEffect, useState } from "react";
import styles from "./SummaryItem.module.scss";
import BtnOutline from "../../Elements/Buttons/Btn-Outline/Btn-Outline";
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";
import Modal from "../../Modal/Modal";
import { SummaryItemType } from "./SummaryItemType";

interface SummaryItemProps {
  summaryItem: SummaryItemType;
}

const SummaryItem: FC<SummaryItemProps> = ({ summaryItem }) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const { keyLabel, value } = summaryItem;
  const openPurchaseHistory = () => {
    setIsActiveModal(true);
  };

  return (
    <div className={styles.SummaryItem}>
      {/* <Modal children={<PurchaseHistory />} isActive={isActiveModal} setIsActiveModal={setIsActiveModal}/> */}
      <div className={styles.container}>
        <div className={styles.title}>
          <h5>{keyLabel}</h5>
          <div className={styles.list}>
            <BtnOutline
              icon={<HiMiniClipboardDocumentCheck />}
              text={"View List"}
              action={openPurchaseHistory}
            />
          </div>
        </div>
        <div className={styles.value}>
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryItem;
