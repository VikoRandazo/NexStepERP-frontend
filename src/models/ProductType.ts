export interface ProductType {
  _id: string;
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: string;
  stockQuantity: number;
  manufacturer?: string;
  purchasesAmount?: number;
}

export const ProductInitState: ProductType = {
  _id: "",
  id: 1,
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
  category: "",
  stockQuantity: 0,
  manufacturer: "",
  purchasesAmount: 0,
};
