import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductInitState, ProductType } from "../../models/ProductType";
import { CustomerType, initClientState } from "../../models/CustomerType";
import { SaleType } from "../../models/SaleType";

export interface EntitySliceType {
  stock: {
    actions: {
      setStock: ProductType[];
      duplicateProduct: number;
      removeProduct: number;
      updateProduct: Partial<ProductType>;
    };
    utiles: {
      selectProducts: string[];
    };
  };

  clients: {
    actions: {
      setClients: CustomerType[];
      addClient: CustomerType;
      removeClient: string;
      updateClient: Partial<CustomerType>;
    };
    utiles: {
      selectClients: string[];
    };
  };

  sales: SaleType[];
}
export const initEntitiesState: EntitySliceType = {
  stock: {
    actions: {
      setStock: [],
      duplicateProduct: 0,
      removeProduct: 0,
      updateProduct: ProductInitState,
    },
    utiles: { selectProducts: [] },
  },
  clients: {
    actions: {
      setClients: [],
      addClient: initClientState,
      removeClient: "",
      updateClient: initClientState,
    },
    utiles: {
      selectClients: [],
    },
  },
  sales: [],
};

export const entitySlice = createSlice({
  name: "entities",
  initialState: initEntitiesState,
  reducers: {
    setStock(state, { payload }: PayloadAction<ProductType[]>) {
      state.stock.actions.setStock = payload;
    },

    addProduct(state, { payload }: PayloadAction<ProductType>) {
      state.stock.actions.setStock = [...state.stock.actions.setStock, payload];
    },

    duplicateProduct(state, { payload }: PayloadAction<number>) {
      state.stock.actions.duplicateProduct = payload;
      const index = state.stock.actions.setStock.findIndex((product) => product.id === payload);

      if (index !== -1) {
        state.stock.actions.setStock = [
          ...state.stock.actions.setStock,
          state.stock.actions.setStock[index]
        ];
      }
    },

    removeProduct(state, { payload }: PayloadAction<number>) {
      state.stock.actions.removeProduct = payload;

      state.stock.actions.setStock = state.stock.actions.setStock.filter(
        (product) => product.id !== payload
      );
    },

    updateProduct(state, { payload }: PayloadAction<Partial<ProductType>>) {
      const updates = payload;

      const index = state.stock.actions.setStock.findIndex((product) => product.id === updates.id);

      if (index !== -1) {
        state.stock.actions.setStock[index] = {
          ...state.stock.actions.setStock[index],
          ...updates,
        };
      }
    },

    setClients(state, { payload }: PayloadAction<CustomerType[]>) {
      state.clients.actions.setClients = payload;
    },

    addClient(state, { payload }: PayloadAction<CustomerType>) {
      state.clients.actions.addClient = payload;
      state.clients.actions.setClients = [...state.clients.actions.setClients, payload];
    },

    removeClient(state, { payload }: PayloadAction<string>) {
      state.clients.actions.removeClient = payload;
      state.clients.actions.setClients = state.clients.actions.setClients.filter(
        (client) => client._id !== payload
      );
    },

    updateClient(state, { payload }: PayloadAction<Partial<CustomerType>>) {
      const updates = payload;

      const index = state.clients.actions.setClients.findIndex(
        (client) => client._id === updates._id
      );

      if (index !== -1) {
        state.clients.actions.setClients[index] = {
          ...state.clients.actions.setClients[index],
          ...updates,
        };
      }
    },

    setSales(state, { payload }) {
      state.sales = payload;
    },
  },
});

export const entitiesAction = entitySlice.actions;
