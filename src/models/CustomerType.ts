import { Address, AddressInit } from "./shared/Address";
import { PurchaseHistoryType, PurchaseHistoryInit } from "./shared/PurchaseHistory";

export interface CustomerType {
  _id?: string
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateRegistered: string;
  address?: Address;
  purchaseHistory: PurchaseHistoryType[];
}

export const initClientState: CustomerType = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateRegistered: "",
  address: AddressInit,
  purchaseHistory: [PurchaseHistoryInit],
};
