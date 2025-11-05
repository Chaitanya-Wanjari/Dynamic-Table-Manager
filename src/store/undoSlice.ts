import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableRow } from "../types/table";

type UndoState = {
  past: TableRow[][];
};

const initialState: UndoState = { past: [] };

const undoSlice = createSlice({
  name: "undo",
  initialState,
  reducers: {
    pushPast(state, action: PayloadAction<TableRow[]>) {
      state.past.push(action.payload);
      if (state.past.length > 20) state.past.shift(); 
    },
    popPast(state) {
      state.past.pop();
    },
    clearPast(state) {
      state.past = [];
    },
  },
});

export const { pushPast, popPast, clearPast } = undoSlice.actions;
export default undoSlice.reducer;
