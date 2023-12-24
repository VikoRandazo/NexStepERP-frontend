import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PagesNames } from "../../models/pagesName";

export interface AppSettings {
  pageName: string;
}

const initAppSettings = {
  pageName: "Overview",
};

export const appSettingsSlice = createSlice({
  name: `appSettings`,
  initialState: initAppSettings,
  reducers: {
    setPageName(state, { payload }:PayloadAction<PagesNames | string>) {
      
      state.pageName = payload;
    },
  },
});

export const appSettingsActions = appSettingsSlice.actions;
