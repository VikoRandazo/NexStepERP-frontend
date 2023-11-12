import { ProductSold } from "./ProductSoldType";

export interface SaleType {
  id?: string;
  date: string;
  productsSold: ProductSold[];
  totalAmount: number;
  customerId: string;
}

export const saleInit = {
  id: "",
  date: new Date().toISOString(),
  productsSold: {
    pid: "",
    price: 0,
    quantity: 0,
  },
  totalAmount: 0,
  customerId: "",
};
