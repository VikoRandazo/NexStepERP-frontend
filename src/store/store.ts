import { configureStore } from "@reduxjs/toolkit";
import { SideBar, sideBarSlice } from "./slices/sideBar";

export interface StoreRootTypes {
  sideBarSlice: SideBar;
}

export const store = configureStore({
  reducer: {
    [sideBarSlice.name]: sideBarSlice.reducer,
  },
});
