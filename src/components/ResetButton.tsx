"use client";
import React from "react";
import { Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useDispatch } from "react-redux";
import { setRows, setVisibleColumns, reorderColumns } from "../store/tableSlice";
import { defaultColumns, defaultVisibleColumns } from "../utils/utils";

export default function ResetButton() {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(setRows([]));
    const cols = defaultColumns();
    dispatch(reorderColumns(cols));
    dispatch(setVisibleColumns(defaultVisibleColumns()));
  };

  return (
    <Button variant="outlined" startIcon={<ReplayIcon />} onClick={handleReset}>
      Reset Table
    </Button>
  );
}
