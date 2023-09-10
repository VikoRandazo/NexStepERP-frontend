import { createSlice } from "@reduxjs/toolkit";

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
    setPageName(state, { payload }) {
      state.pageName = payload;
    },
  },
});

export const appSettingsActions = appSettingsSlice.actions;
