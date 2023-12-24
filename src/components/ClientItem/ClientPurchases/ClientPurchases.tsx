import React, { FC } from "react";
import styles from "./ClientPurchases.module.scss";
import PurchaseHistory from "./Purchase/Purchase";
import { PurchaseHistoryType } from "../../../models/shared/PurchaseHistory";
import { Sale } from "../../../models/Sale";

interface ClientPurchasesProps {
  clientId: string | null;
  purchaseHistory: Sale[];
}

const ClientPurchases: FC<ClientPurchasesProps> = ({ purchaseHistory }) => {

  return (
    <div className={styles.ClientPurchases}>
      {purchaseHistory.length ? (
        purchaseHistory.map((purchase: Sale) => {
          return <PurchaseHistory purchase={purchase} />;
        })
      ) : (
        <p className={styles.noPurchases}>Theres nothing here...</p>
      )}

      <hr />
    </div>
  );
};
export default ClientPurchases;
