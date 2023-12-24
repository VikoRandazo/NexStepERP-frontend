import { configureStore } from "@reduxjs/toolkit";
import { SideBar, sideBarSlice } from "./slices/sideBar";
import { AppSettings, appSettingsSlice } from "./slices/appSettings";
import { EntitySliceType, entitySlice } from "./slices/entities";
import { UiSlice, UiSliceType } from "./slices/ui";
import { TableSlice, TableSliceType } from "./slices/table";
import { ShoppingCartSliceType, ShoppingCartSlice } from "./slices/shoppingCart";
import { UserAuth, userAuthSlice } from "./slices/auth";

export interface StoreRootTypes {
  ui: UiSliceType;
  table: TableSliceType;
  entities: EntitySliceType;
  appSettings: AppSettings;
  sideBarSlice: SideBar;
  shoppingCart: ShoppingCartSliceType;
  userAuth: UserAuth;
}

export const store = configureStore({
  reducer: {
    [UiSlice.name]: UiSlice.reducer,
    [TableSlice.name]: TableSlice.reducer,
    [entitySlice.name]: entitySlice.reducer,
    [sideBarSlice.name]: sideBarSlice.reducer,
    [appSettingsSlice.name]: appSettingsSlice.reducer,
    [ShoppingCartSlice.name]: ShoppingCartSlice.reducer,
    [userAuthSlice.name]: userAuthSlice.reducer,
  },
});
