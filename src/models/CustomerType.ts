import { Address } from "./shared/Address";
import { PurchaseHistory } from "./shared/PurchaseHistory";

export interface CustomerType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateRegistered: Date;
  address?: Address;
  purchaseHistory: PurchaseHistory[];
}
