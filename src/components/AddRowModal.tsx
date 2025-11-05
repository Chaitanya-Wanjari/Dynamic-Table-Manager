"use client";
import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRow } from "../store/tableSlice";
import { v4 as uuidv4 } from "uuid";
import { pushPast } from "../store/undoSlice";

export default function AddRowModal() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (vals: any) => {
    const row = {
      id: uuidv4(),
      name: vals.name ?? "",
      email: vals.email ?? "",
      age: vals.age ? Number(vals.age) : "",
      role: vals.role ?? "",
    };
    dispatch(addRow(row));
    reset();
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Add Row</Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" {...register("name")} />
            <TextField label="Email" {...register("email")} />
            <TextField label="Age" type="number" {...register("age")} />
            <TextField label="Role" {...register("role")} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
