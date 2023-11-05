export interface ProductSold {
  pid?: string;
  price: number;
  quantity: number;
}

export const ProductSoldInit = {
  pid: "",
  price: 0,
  quantity: 50,
};
