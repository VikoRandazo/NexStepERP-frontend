import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CustomerType, initClientState } from "../../models/CustomerType";
import { ProductSold, ProductSoldInit } from "../../models/ProductSoldType";
import { ProductType } from "../../models/ProductType";

type ProductTypesNarrowed = Omit<ProductType, `description` | `stockQuantity`>;

export type ShoppingCartSliceType = {
  date: string;
  client: CustomerType | null;
  products: { product: ProductType; quantity: number }[];
  totalItems: number;
  totalPrice: number;
  lastUpdated: string;
};

const initShoppingCart: ShoppingCartSliceType = {
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

    setProduct(state, { payload }: PayloadAction<ProductType>) {
      const { description, stockQuantity, ...rest } = payload;

      const foundProduct = state.products.find(
        (productInCart) => productInCart.product._id === payload._id
      );

      if (foundProduct) {
        foundProduct.quantity += 1;
      } else {
        state.products = [...state.products, { product: payload, quantity: 1 }];
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
        (product) => product.product._id === payload
      );

      if (foundProductIndex !== -1) {
        if (state.products[foundProductIndex].quantity > 1) {
          state.products[foundProductIndex].quantity -= 1;
        } else {
          state.products.splice(foundProductIndex, 1);
        }
      }

      state.totalItems = state.products.reduce((total, product) => {
        return total + product.quantity;
      }, 0);

      state.totalPrice = state.products.reduce((total, product) => {
        return total + product.product.price * product.quantity;
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
