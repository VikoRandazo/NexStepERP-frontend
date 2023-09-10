import { configureStore } from "@reduxjs/toolkit";
import { SideBar, sideBarSlice } from "./slices/sideBar";
import { AppSettings, appSettingsSlice } from "./slices/appSettings";

export interface StoreRootTypes {
  appSettings: AppSettings
  sideBarSlice: SideBar;
}

export const store = configureStore({
  reducer: {
    [sideBarSlice.name]: sideBarSlice.reducer,
    [appSettingsSlice.name]: appSettingsSlice.reducer,
  },
});
