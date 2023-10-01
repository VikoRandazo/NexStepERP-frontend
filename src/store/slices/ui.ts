import { createSlice } from "@reduxjs/toolkit";
import { InteractionsMode } from "../../models/shared/InteractionsMode";
import { TableSliceType, tableInitState } from "./table";

export interface UiSliceType {
  modal: { isOpen: boolean; mode: InteractionsMode };
  // table: TableSliceType;
}
export const initUiState = {
  modal: { isOpen: false, mode: `create` },
  // table: tableInitState,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState: initUiState,
  reducers: {
    setIsOpen(state, { payload }) {
      state.modal.isOpen = payload;
    },
    setMode(state, { payload }) {
      state.modal.mode = payload;
    },
  },
});

export const UiActions = UiSlice.actions;
