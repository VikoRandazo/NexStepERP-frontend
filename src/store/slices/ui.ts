import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InteractionsMode, InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import { ComponentCase, ComponentCaseEnum } from "../../models/ComponentCase";

export interface UiSliceType {
  modal: {
    isOpen: boolean;
    mode: InteractionsModeEnum;
    type: ComponentCaseEnum | null;
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
    setModalType(state, { payload }: PayloadAction<ComponentCaseEnum | null>) {
      state.modal.type = payload;
    },
  },
});

export const UiActions = UiSlice.actions;
