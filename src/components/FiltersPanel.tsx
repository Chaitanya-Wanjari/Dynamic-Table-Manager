"use client";
import React, { useMemo } from "react";
import { Box, TextField, MenuItem, Slider, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Props = {
  roleFilter: string | null;
  setRoleFilter: (v: string | null) => void;
  ageRange: number[];
  setAgeRange: (v: number[]) => void;
};

export default function FiltersPanel({ roleFilter, setRoleFilter, ageRange, setAgeRange }: Props) {
  const { rows } = useSelector((s: RootState) => s.table);

  const roles = useMemo(() => {
    const s = new Set<string>();
    rows.forEach(r => {
      if (r.role) s.add(String(r.role));
    });
    return Array.from(s);
  }, [rows]);

  const handleSlider = (_: any, val: number | number[]) => {
    if (Array.isArray(val)) setAgeRange(val);
  };

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <TextField
          select
          label="Role"
          size="small"
          value={roleFilter ?? ""}
          onChange={(e) => setRoleFilter(e.target.value || null)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </TextField>

        <Box sx={{ width: 280 }}>
          <Typography variant="caption" display="block">Age range</Typography>
          <Slider
            value={ageRange}
            onChange={handleSlider}
            valueLabelDisplay="auto"
            min={18}
            max={70}
          />
        </Box>
      </Box>
    </Paper>
  );
}
