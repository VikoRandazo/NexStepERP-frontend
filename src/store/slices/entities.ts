import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductInitState, ProductType } from "../../models/ProductType";
import { CustomerType } from "../../models/CustomerType";
import { SaleType } from "../../models/SaleType";

export interface EntitySliceType {
  stock: ProductType[];
  clients: CustomerType[];
  sales: SaleType[];
  selectedProducts: ProductType[];
}
export const initEntitiesState = {
  stock: [],
  clients: [],
  sales: [],
  selectedProducts: [] as ProductType[],
};

export const entitySlice = createSlice({
  name: "entities",
  initialState: initEntitiesState,
  reducers: {
    setStock(state, { payload }) {
      state.stock = payload;
    },
    setClients(state, { payload }) {
      state.clients = payload;
    },

    setSales(state, { payload }) {
      state.sales = payload;
    },

    removeFromStock(state, { payload }: PayloadAction<number[]>) {
      state.stock = state.stock.filter((productId: number) => {
        return !payload.includes(productId);
      });
    },
  },
});

export const entitiesAction = entitySlice.actions;
