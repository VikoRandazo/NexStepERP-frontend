import { ProductsSold } from "./ProductsSold";

export interface Sale {
  _id?: string;
  date: string;
  productsSold: ProductsSold[];
  totalAmount: number;
  customerId: string;
}

