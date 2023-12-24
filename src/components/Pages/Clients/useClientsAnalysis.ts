import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomerType } from "../../../models/CustomerType";
import { StoreRootTypes } from "../../../store/store";
import { PurchaseHistoryType } from "../../../models/shared/PurchaseHistory";
import { SummaryItemType } from "../../Summary/SummaryItem/SummaryItemType";

export const useClientsAnalysis = (clients: CustomerType[]) => {
  const [newClients, setNewClients] = useState<any[]>([]);
  const [haventOrderThisMonth, setHaventOrderThisMonth] = useState<any[]>([]);
  const entity = useSelector((state: StoreRootTypes) => state.ui.modal.type);

  const analysisData: SummaryItemType[] = [
    { keyLabel: `New This Month`, value: newClients.length },
    { keyLabel: `Havent Order This Month`, value: haventOrderThisMonth.length },
    { keyLabel: `Total ${entity}`, value: clients.length },
  ];

  const newThisMonths = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const newClients = clients.filter((item: CustomerType) => {
      const registrationDate = new Date(item.dateRegistered);
      return (
        registrationDate.getMonth() === currentMonth &&
        registrationDate.getFullYear() === currentYear
      );
    });

    setNewClients(newClients);
  };

  const clientsDidntOrderThisMonth = () => {
    const currentMonth = new Date().getMonth(); // 0-11 for Jan-Dec
    const currentYear = new Date().getFullYear();

    const didntOrder = clients.filter((client: CustomerType) => {
      const hasOrderThisMonth = client.purchaseHistory.some((purchase: PurchaseHistoryType) => {
        const purchaseDate = new Date(purchase.purchaseDate);
        return (
          purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear
        );
      });

      return !hasOrderThisMonth;
    });

    setHaventOrderThisMonth(didntOrder);
  };

  useEffect(() => {
    newThisMonths();
    clientsDidntOrderThisMonth();
  }, [clients]);

  return { analysisData };
};
