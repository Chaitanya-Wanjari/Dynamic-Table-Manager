"use client";

import React, { useRef, useState } from "react";
import { Button, Stack, Snackbar, Alert } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setRows } from "../store/tableSlice";
import { importCSV, exportCSV } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";

export default function ImportExportButtons() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const { rows, visibleColumns } = useSelector((s: RootState) => s.table);
  const [snack, setSnack] = useState<{ msg: string; severity: "success" | "error" | "info" } | null>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { data, errors } = await importCSV(file);
      if (errors.length) {
        setSnack({ msg: `Imported with ${errors.length} parse errors. Check console.`, severity: "info" });
        console.warn(errors);
      } else setSnack({ msg: "CSV imported", severity: "success" });

      const normalized = data.map((r: any, idx: number) => ({
        id: r.id || uuidv4(),
        name: r.name ?? r.Name ?? r.fullName ?? "",
        email: r.email ?? r.Email ?? "",
        age: r.age ?? r.Age ?? "",
        role: r.role ?? r.Role ?? "",
        ...r,
      }));
      dispatch(setRows(normalized));
    } catch (err: any) {
      setSnack({ msg: "Failed to parse CSV: " + err.message, severity: "error" });
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleExport = () => {
    if (!rows?.length) {
      setSnack({ msg: "No data to export", severity: "info" });
      return;
    }
    exportCSV(rows, visibleColumns);
    setSnack({ msg: "Export started", severity: "success" });
  };

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="flex-end" mb={2}>
        <input ref={inputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleImport} />
        <Button variant="contained" startIcon={<UploadIcon />} onClick={() => inputRef.current?.click()}>
          Import CSV
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport}>
          Export CSV
        </Button>
      </Stack>

      <Snackbar open={!!snack} autoHideDuration={3500} onClose={() => setSnack(null)}>
        {snack ? (
    <Alert
      onClose={() => setSnack(null)}
      severity={snack.severity}
      sx={{ width: "100%" }}
    >
      {snack.msg}
    </Alert>
  ) : undefined}
      </Snackbar>
    </>
  );
}
