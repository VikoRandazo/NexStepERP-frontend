import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CustomerType } from "../../models/CustomerType";
import { ProductType } from "../../models/ProductType";

export type ShoppingCartProduct = { product: ProductType; quantity: number };

export type ShoppingCartSliceType = {
  date: string;
  client: CustomerType | null;
  products: ShoppingCartProduct[];
  totalItems: number;
  totalPrice: number;
  lastUpdated: string;
};

export const initShoppingCart: ShoppingCartSliceType = {
  date: new Date().toISOString(),
  client: null,
  products: [],
  totalItems: 0,
  totalPrice: 0,
  lastUpdated: "",
};

export const ShoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: initShoppingCart,
  reducers: {
    setProduct(state, { payload }: PayloadAction<ShoppingCartProduct>) {
      const newProduct = payload;

      const productExist = state.products.find((obj: ShoppingCartProduct) => {
        return obj.product.id === newProduct.product.id;
      });

      if (productExist) {
        productExist.quantity += 1;
      } else {
        state.products = [...state.products, newProduct];
      }

      state.totalItems = state.products.reduce((total, product: ShoppingCartProduct) => {
        return (total += product.quantity);
      }, 0);

      state.totalPrice = state.products.reduce((total, product: ShoppingCartProduct) => {
        return (total += product.product.price * product.quantity);
      }, 0);

      state.lastUpdated = new Date().toISOString();
    },

    removeProduct(state, { payload }: PayloadAction<number>) {
      const foundProduct = state.products.findIndex((obj: ShoppingCartProduct) => {
        return obj.product.id === payload;
      });

      if (foundProduct !== -1) {
        if (state.products[foundProduct].quantity > 1) {
          state.products[foundProduct].quantity -= 1;
        } else {
          state.products.splice(foundProduct, 1);
        }
      }
      state.totalItems = state.products.reduce((total, product: ShoppingCartProduct) => {
        return (total += product.quantity);
      }, 0);

      state.totalPrice = state.products.reduce((total, product: ShoppingCartProduct) => {
        return (total += product.product.price * product.quantity);
      }, 0);

      state.lastUpdated = new Date().toISOString();
    },
    clearCart(state) {
      state.products = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.lastUpdated = new Date().toISOString();
    },
  },
});
export const shoppingCartActions = ShoppingCartSlice.actions;
