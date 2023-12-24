import { ProductSold } from "./ProductSoldType";

export interface SaleType {
  _id: string;
  date: string;
  productsSold: ProductSold[];
  totalAmount: number;
  customerId: string;
}

export const saleInit: SaleType = {
  _id: "",
  date: new Date().toISOString(),
  productsSold: [
    {
      pid: "",
      price: 0,
      quantity: 0,
    },
  ],
  totalAmount: 0,
  customerId: "",
};
