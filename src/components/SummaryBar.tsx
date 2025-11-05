"use client";
import React, { useMemo } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function SummaryBar({ filteredCount }: { filteredCount: number }) {
  const { rows, visibleColumns } = useSelector((s: RootState) => s.table);

  const total = rows.length;
  const visible = visibleColumns.length;

  return (
    <Box display="flex" gap={2} alignItems="center" mb={2} flexWrap="wrap">
      <Chip label={`Total rows: ${total}`} />
      <Chip label={`Visible columns: ${visible}`} />
      <Chip label={`Filtered: ${filteredCount}`} />
      <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
        Tip: Double-click a cell to edit inline
      </Typography>
    </Box>
  );
}
