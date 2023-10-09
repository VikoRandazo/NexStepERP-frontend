import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductInitState, ProductType } from "../../models/ProductType";
import { CustomerType } from "../../models/CustomerType";
import { SaleType } from "../../models/SaleType";

export interface EntitySliceType {
  stock: { products: ProductType[]; product: ProductType };
  clients: CustomerType[];
  sales: SaleType[];
}
export const initEntitiesState = {
  stock: { products: [], product: ProductInitState },
  clients: [],
  sales: [],
};

export const entitySlice = createSlice({
  name: "entities",
  initialState: initEntitiesState,
  reducers: {
    setStock(state, { payload }) {
      state.stock.products = payload;
    },
    setClients(state, { payload }) {
      state.clients = payload;
    },

    setSales(state, { payload }) {
      state.sales = payload;
    },

    removeFromStock(state, { payload }: PayloadAction<string[]>) {
      state.stock.products = state.stock.products.filter((productId: string) => {
        return !payload.includes(productId);
      });
    },
    setProduct(state, { payload }: PayloadAction<ProductType>) {
      state.stock.product = payload;
    },
  },
});

export const entitiesAction = entitySlice.actions;
