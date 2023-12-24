import React, { FC } from "react";
import styles from "./Purchase.module.scss";
import { BtnActionsTextEnum } from "../../../Elements/Buttons/BtnActionsText";
import BtnOutline from "../../../Elements/Buttons/Btn-Outline/Btn-Outline";
import { useFormatDate } from "../../../../hooks/useFormatDate";
import { Sale } from "../../../../models/Sale";

interface PurchaseProps {
  purchase: Sale;
}

// date: string;
// productsSold: ProductsSold[];
// totalAmount: number;
// customerId: string;

const PurchaseHistory: FC<PurchaseProps> = ({ purchase }) => {
  const {_id, customerId, date, productsSold, totalAmount } = purchase;

  const formattedDate = useFormatDate(date, `/`, true);

  return (
    <div className={styles.Purchase}>
      
      <div className={styles.record}>
        <div className={styles.title}>
          <span className={styles.date}>{date}</span>
        </div>

        <div className={styles.main}>
          <span className={styles.purchaseId}>id: {_id}</span>
          <span className={styles.totalPrice}>{totalAmount}$</span>
          <span className={styles.actions}>
            <BtnOutline text={BtnActionsTextEnum.VIEW_DOCUMENT} action={() => {}} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
