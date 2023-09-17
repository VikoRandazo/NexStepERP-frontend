export interface ProductType {
  _id?: string | undefined;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: string;
  stockQuantity: number;
  manufacturer?: string;
  purchasesAmount?: number;
  [key: string]: string | number | undefined;
}

export const ProductInitState: ProductType = {
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
  category: "",
  stockQuantity: 0,
  manufacturer: "",
  purchasesAmount: 0,
};
