import { Address } from "./shared/Address";
import { PurchaseHistory } from "./shared/PurchaseHistory";

export interface CustomerType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateRegistered: string;
  address?: Address;
  purchaseHistory: PurchaseHistory[];
}
