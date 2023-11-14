import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CustomerType, initClientState } from "../../models/CustomerType";
import { ProductSold, ProductSoldInit } from "../../models/ProductSoldType";

export type ShoppingCart = {
  date: string;
  client: CustomerType | null;
  products: { product: ProductSold; quantity: number }[];
  totalItems: number;
  totalPrice: number;
  lastUpdated: string;
};

const initShoppingCart: ShoppingCart = {
  date: "",
  client: null,
  products: [],
  totalItems: 0,
  totalPrice: 0,
  lastUpdated: new Date().toISOString(),
};

export const ShoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: initShoppingCart,
  reducers: {
    setClient(state, { payload }: PayloadAction<CustomerType>) {
      state.client = payload;
    },

    setProduct(state, { payload }: PayloadAction<ProductSold>) {
      const foundProduct = state.products.find(
        (productInCart) => productInCart.product.pid === payload.pid
      );

      if (!foundProduct) {
        state.products = [
          ...state.products,
          { product: { pid: payload.pid, price: payload.price, quantity: 1 }, quantity: 1 },
        ];
      } else {
        foundProduct.quantity += 1;
        foundProduct.product.quantity += 1;
      }

      state.totalItems = state.products.reduce((total, product) => {
        return total + product.quantity;
      }, 0);

      state.totalPrice = state.products.reduce((total, product) => {
        return total + product.product.price * product.quantity;
      }, 0);

      state.lastUpdated = new Date().toISOString();
    },

    removeProduct(state, { payload }: PayloadAction<string>) {
      const foundProductIndex = state.products.findIndex(
        (product) => product.product.pid === payload
      );

      if (foundProductIndex !== -1) {
        if (state.products[foundProductIndex].quantity > 1) {
          state.products[foundProductIndex].quantity -= 1;
          state.products[foundProductIndex].product.quantity -= 1;
        } else {
          state.products.splice(foundProductIndex, 1);
        }
      }

      state.totalItems = state.products.reduce((total, product) => {
        return total + product.quantity;
      }, 0);

      state.totalPrice = state.products.reduce((total, product) => {
        return total + product.product.price * product.product.quantity;
      }, 0);
    },

    applyDiscount(state, { payload }: PayloadAction<number>) {
      state.totalPrice = Object.values(state.products).reduce(
        (total, { product, quantity }) => total + product.price * quantity * (1 - payload),
        0
      );

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
