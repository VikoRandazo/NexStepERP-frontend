import { CustomerType } from "../../../models/CustomerType";
import { ProductType } from "../../../models/ProductType";

export type InputFieldKeys = 
  | { pageName: 'Clients', key: keyof CustomerType, type: string, title: string, group: number, textarea?: boolean }
  | { pageName: 'Stock', key: keyof ProductType, type: string, title: string, group: number, textarea?: boolean }

export interface InputField {
  key: string;
  type: "text" | "number" | "password" | "email" | "url" | "date";
  title: string;
  textarea?: boolean;
  group: number;
}
