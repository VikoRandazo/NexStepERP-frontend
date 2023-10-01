import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

export interface TableSliceType {
  selectAllRows: boolean
  selectedRows: string[];
}

const initTableState = {
  selectAllRows: false,
  selectedRows: [] as string[],
};

export const TableSlice = createSlice({
  name: "table",
  initialState: initTableState,
  reducers: {
    setSelectedRows(state, { payload }: PayloadAction<string[]>) {
      const selectedRowsSet = new Set([...state.selectedRows, ...payload]);
      state.selectedRows = Array.from(selectedRowsSet);
    },
    removeSelectedRows(state, { payload }: PayloadAction<string[]>) {
      state.selectedRows = state.selectedRows.filter((item) => !payload.includes(item));
    },

    SelectAll(state, { payload }: PayloadAction<boolean>) {
      state.selectAllRows = payload
    },
  },
});

export const TableActions = TableSlice.actions;
export const tableInitState = TableSlice.getInitialState();