import { ProductSold } from "./ProductSoldType";

export interface SaleType {
  id?: string;
  date: string;
  productsSold: ProductSold[];
  totalAmount: number;
  customerId: string;
}
