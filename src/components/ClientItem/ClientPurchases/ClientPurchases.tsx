import React, { FC, useEffect } from "react";
import styles from "./ClientPurchases.module.scss";
import PurchaseHistory from "./Purchase/Purchase";
import { PurchaseHistoryType } from "../../../models/shared/PurchaseHistory";
import { ProductSold } from "../../../models/ProductSoldType";

interface ClientPurchasesProps {
  clientId: string | null;
  purchaseHistory: PurchaseHistoryType[];
  productsSold: ProductSold[];
}

const ClientPurchases: FC<ClientPurchasesProps> = ({ clientId, purchaseHistory, productsSold }) => {

  return (
    <div className={styles.ClientPurchases}>
      {purchaseHistory.length ? (
        purchaseHistory.map((purchase: PurchaseHistoryType) => {
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
