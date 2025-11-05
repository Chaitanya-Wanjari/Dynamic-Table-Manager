"use client";
import React from "react";
import { TableRow, TableCell, TextField, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  row: any;
  visibleColumns: string[];
  editingIds: Set<string>;
  edits: Record<string, any>;
  startEdit: (id: string) => void;
  setEditField: (id: string, key: string, val: any) => void;
  confirmDeleteId: (id?: string) => void;
};

function RowComp({ row, visibleColumns, editingIds, edits, startEdit, setEditField, confirmDeleteId }: Props) {
  return (
    <TableRow hover>
      {visibleColumns.map(col => (
        <TableCell key={col}>
          {editingIds.has(row.id) ? (
            <TextField
              size="small"
              value={(edits[row.id]?.[col] ?? row[col] ?? "")}
              onChange={(e) => setEditField(row.id, col, e.target.value)}
            />
          ) : (
            <div onDoubleClick={() => startEdit(row.id)}>{row[col] ?? ""}</div>
          )}
        </TableCell>
      ))}
      <TableCell>
        <Tooltip title="Edit"><IconButton onClick={() => startEdit(row.id)} size="small"><EditIcon /></IconButton></Tooltip>
        <Tooltip title="Delete"><IconButton onClick={() => confirmDeleteId(row.id)} size="small"><DeleteIcon /></IconButton></Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default React.memo(RowComp, (prev, next) => {
  if (prev.row.id !== next.row.id) return false;
  if (prev.editingIds.has(prev.row.id) !== next.editingIds.has(next.row.id)) return false;
  return true;
});
