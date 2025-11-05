"use client";

import React, { useState } from "react";
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Checkbox, FormControlLabel, Stack
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addColumn, toggleColumnVisibility, setVisibleColumns } from "../store/tableSlice";

export default function ManageColumnsModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { columns, visibleColumns } = useSelector((s: RootState) => s.table);
  const { register, handleSubmit, reset } = useForm<{ newCol: string }>();

  const onAdd = (vals: { newCol: string }) => {
    const c = vals.newCol.trim();
    if (c) dispatch(addColumn(c));
    reset();
  };

  const onToggle = (col: string) => dispatch(toggleColumnVisibility(col));

  const onSaveOrder = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>Manage Columns</Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Manage Columns</DialogTitle>
        <DialogContent>
          <Stack spacing={2} pt={1}>
            {columns.map(col => (
              <FormControlLabel
                key={col}
                control={<Checkbox checked={visibleColumns.includes(col)} onChange={() => onToggle(col)} />}
                label={col}
              />
            ))}

            <form onSubmit={handleSubmit(onAdd)}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField {...register("newCol")} size="small" label="Add column (eg. Department)" />
                <Button type="submit" variant="contained">Add</Button>
              </Stack>
            </form>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); }}>Close</Button>
          <Button onClick={onSaveOrder} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
