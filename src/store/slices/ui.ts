import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InteractionsMode, InteractionsModeEnum } from "../../models/shared/InteractionsMode";

export interface UiSliceType {
  modal: {
    isOpen: boolean;
    mode: InteractionsMode;
    type: `ProductForm` | null;
    itemId: string | null;
  };

  // table: TableSliceType;
}
export const initUiState: UiSliceType = {
  modal: { isOpen: false, mode: InteractionsModeEnum.Create, type: null, itemId: null },
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
    setModalType(state, { payload }: PayloadAction<{ modalType: 'ProductForm' | null, productId: string | null }>) {
      state.modal.type = payload.modalType;
      state.modal.itemId = payload.productId;
    },
  },
});

export const UiActions = UiSlice.actions;
