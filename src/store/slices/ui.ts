import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InteractionsMode, InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import { EntityEnum } from "../../models/EntityEnum";

export interface UiSliceType {
  modal: {
    isOpen: boolean;
    mode: InteractionsModeEnum;
    type: EntityEnum | null;
    itemId: string | null;
  };

  // table: TableSliceType;
}
export const initUiState: UiSliceType = {
  modal: { isOpen: false, mode: InteractionsModeEnum.Create, type: null, itemId: null },
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
    setEntity(state, { payload }: PayloadAction<EntityEnum | null>) {
      state.modal.type = payload;
    },
  },
});

export const UiActions = UiSlice.actions;
