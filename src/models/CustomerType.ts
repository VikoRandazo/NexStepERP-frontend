import { Address, AddressInit } from "./shared/Address";
import { PurchaseHistory, PurchaseHistoryInit } from "./shared/PurchaseHistory";

export interface CustomerType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateRegistered: string;
  address?: Address;
  purchaseHistory: PurchaseHistory[];
  [key: string]: any;
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
