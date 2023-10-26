export interface PurchaseHistory {
  productId: string;
  quantity: number;
  purchaseDate: string;
  amountPaid: number;
}

export const PurchaseHistoryInit = {
  productId: "",
  quantity: 0,
  purchaseDate: "",
  amountPaid: 0,
};
