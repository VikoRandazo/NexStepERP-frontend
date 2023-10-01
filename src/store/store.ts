import { configureStore } from "@reduxjs/toolkit";
import { SideBar, sideBarSlice } from "./slices/sideBar";
import { AppSettings, appSettingsSlice } from "./slices/appSettings";
import { EntitySliceType, entitySlice } from "./slices/entities";
import { UiSlice, UiSliceType } from "./slices/ui";
import { TableSlice, TableSliceType } from "./slices/table";

export interface StoreRootTypes {
  ui: UiSliceType;
  table: TableSliceType
  entities: EntitySliceType;
  appSettings: AppSettings;
  sideBarSlice: SideBar;
}

export const store = configureStore({
  reducer: {
    [UiSlice.name]: UiSlice.reducer,
    [TableSlice.name]: TableSlice.reducer,
    [entitySlice.name]: entitySlice.reducer,
    [sideBarSlice.name]: sideBarSlice.reducer,
    [appSettingsSlice.name]: appSettingsSlice.reducer,
  },
});
