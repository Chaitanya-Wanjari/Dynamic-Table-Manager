"use client";
import React from "react";
import { Button } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { exportJSON } from "../utils/utils";

export default function ExportJSONButton() {
  const { rows, visibleColumns } = useSelector((s: RootState) => s.table);

  return (
    <Button
      variant="outlined"
      startIcon={<ImportExportIcon />}
      onClick={() => exportJSON(rows, visibleColumns)}
    >
      Export JSON
    </Button>
  );
}
