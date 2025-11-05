import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RowData = {
  id: string;
  name?: string;
  email?: string;
  age?: number | string;
  role?: string;
  [key: string]: any;
};

type TableState = {
  rows: RowData[];
  columns: string[];        
  visibleColumns: string[];
  theme: "light" | "dark";
};

const initialState: TableState = {
  rows: [],
  columns: ["name", "email", "age", "role"],
  visibleColumns: ["name", "email", "age", "role"],
  theme: "light",
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<RowData[]>) {
      state.rows = action.payload;
    },
    addRow(state, action: PayloadAction<RowData>) {
      state.rows.unshift(action.payload);
    },
    updateRow(state, action: PayloadAction<{ id: string; patch: Partial<RowData> }>) {
      const { id, patch } = action.payload;
      state.rows = state.rows.map(r => (r.id === id ? { ...r, ...patch } : r));
    },
    deleteRow(state, action: PayloadAction<string>) {
      state.rows = state.rows.filter(r => r.id !== action.payload);
    },
    addColumn(state, action: PayloadAction<string>) {
      const c = action.payload;
      if (!state.columns.includes(c)) {
        state.columns.push(c);
        state.visibleColumns.push(c);
      }
    },
    toggleColumnVisibility(state, action: PayloadAction<string>) {
      const c = action.payload;
      state.visibleColumns = state.visibleColumns.includes(c)
        ? state.visibleColumns.filter(x => x !== c)
        : [...state.visibleColumns, c];
    },
    reorderColumns(state, action: PayloadAction<string[]>) {
      state.columns = action.payload;
      state.visibleColumns = action.payload.filter(c => state.visibleColumns.includes(c));
    },
    setVisibleColumns(state, action: PayloadAction<string[]>) {
      state.visibleColumns = action.payload;
    },
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
    },
  },
});

export const {
  setRows,
  addRow,
  updateRow,
  deleteRow,
  addColumn,
  toggleColumnVisibility,
  reorderColumns,
  setVisibleColumns,
  setTheme,
} = tableSlice.actions;
export default tableSlice.reducer;
