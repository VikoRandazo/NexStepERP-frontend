import React, { FC } from "react";
import styles from "./Purchase.module.scss";
import { BtnActionsTextEnum } from "../../../Elements/Buttons/BtnActionsText";
import BtnOutline from "../../../Elements/Buttons/Btn-Outline/Btn-Outline";
import { PurchaseHistoryType } from "../../../../models/shared/PurchaseHistory";
import { useFormatDate } from "../../../../hooks/useFormatDate";

interface PurchaseProps {
  purchase: PurchaseHistoryType;
}

const PurchaseHistory: FC<PurchaseProps> = ({ purchase }) => {
  const { productId, purchaseDate, quantity, amountPaid } = purchase;

  const date = useFormatDate(purchaseDate, `/`, true);

  return (
    <div className={styles.Purchase}>
      
      <div className={styles.record}>
        <div className={styles.title}>
          <span className={styles.date}>{date}</span>
        </div>

        <div className={styles.main}>
          <span className={styles.purchaseId}>id: {productId}</span>
          <span className={styles.quantity}>quantity: {quantity}</span>
          <span className={styles.totalPrice}>{amountPaid}$</span>
          <span className={styles.actions}>
            <BtnOutline text={BtnActionsTextEnum.VIEW_DOCUMENT} action={() => {}} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
