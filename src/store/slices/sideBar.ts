import { createSlice } from "@reduxjs/toolkit";

export interface SideBar {
    isExpanded: boolean;
}

const initStateSideBar = {
    isExpanded: false,
};

export const sideBarSlice = createSlice({
  name: `sideBarSlice`,
  initialState: initStateSideBar,
  reducers: {
    toggleSideBar (state) {
      state.isExpanded = !state.isExpanded
    }
  },
});

export const sideBarActions = sideBarSlice.actions;
