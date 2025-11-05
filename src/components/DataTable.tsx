"use client";

import React, { useMemo, useState } from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TextField, TablePagination, IconButton, Stack, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, Paper, Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import BarChartIcon from "@mui/icons-material/BarChart"; 
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { updateRow, deleteRow, reorderColumns } from "../store/tableSlice";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

type Order = "asc" | "desc";

export default function DataTable() {
  const dispatch = useDispatch();
  const { rows, columns, visibleColumns } = useSelector((s: RootState) => s.table);

  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<string>(columns[0]);
  const [order, setOrder] = useState<Order>("asc");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [edits, setEdits] = useState<Record<string, any>>({});
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; id?: string }>({ open: false });

  const filtered = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter(r =>
      Object.values(r).some(v => (v ?? "").toString().toLowerCase().includes(q))
    );
  }, [rows, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const A = (a[orderBy] ?? "").toString();
      const B = (b[orderBy] ?? "").toString();
      if (A === B) return 0;
      return order === "asc" ? (A > B ? 1 : -1) : (A < B ? 1 : -1);
    });
    return arr;
  }, [filtered, orderBy, order]);

  const pageRows = useMemo(
    () => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sorted, page]
  );

  const handleSort = (col: string) => {
    if (orderBy === col) setOrder(order === "asc" ? "desc" : "asc");
    else {
      setOrderBy(col);
      setOrder("asc");
    }
  };

  const startEdit = (id: string) => {
    setEditingIds(prev => new Set(prev).add(id));
    const row = rows.find(r => r.id === id);
    setEdits(prev => ({ ...prev, [id]: { ...row } }));
  };
  const setEditField = (id: string, key: string, val: any) => {
    setEdits(prev => ({ ...prev, [id]: { ...prev[id], [key]: val } }));
  };
  const saveAll = () => {
    Object.entries(edits).forEach(([id, patch]) => {
      dispatch(updateRow({ id, patch }));
    });
    setEditingIds(new Set());
    setEdits({});
  };
  const cancelAll = () => {
    setEditingIds(new Set());
    setEdits({});
  };

  const confirmDeleteId = (id?: string) => setConfirmDelete({ open: true, id });
  const doDelete = () => {
    if (confirmDelete.id) dispatch(deleteRow(confirmDelete.id));
    setConfirmDelete({ open: false });
  };

  const onDragEnd = (res: any) => {
    if (!res.destination) return;
    const newCols = Array.from(columns);
    const [moved] = newCols.splice(res.source.index, 1);
    newCols.splice(res.destination.index, 0, moved);
    dispatch(reorderColumns(newCols));
  };

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 3, mt: 3 }}>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <BarChartIcon color="primary" fontSize="large" />
        <Box>
          <strong style={{ fontSize: "1.25rem" }}>Dynamic Data Table</strong>
          <div style={{ fontSize: "0.85rem", color: "gray" }}>
            Search, edit, drag, and customize your data easily.
          </div>
        </Box>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        mb={2}
      >
        <TextField
          placeholder="Search..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(0);
          }}
          size="small"
          sx={{ width: { xs: "100%", sm: 300 } }}
        />
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={saveAll}
          >
            Save All
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<CancelIcon />}
            onClick={cancelAll}
          >
            Cancel All
          </Button>
        </Stack>
      </Stack>

      <DragDropContext onDragEnd={onDragEnd}>
        <TableContainer sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <Droppable droppableId="columns" direction="horizontal" type="col">
                {provided => (
                  <TableRow ref={provided.innerRef} {...provided.droppableProps}>
                    {visibleColumns.map((col, idx) => (
                      <Draggable key={col} draggableId={col} index={idx}>
                        {prov => (
                          <TableCell
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                          >
                            <TableSortLabel
                              active={orderBy === col}
                              direction={order}
                              onClick={() => handleSort(col)}
                            >
                              {col.toUpperCase()}
                            </TableSortLabel>
                          </TableCell>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                )}
              </Droppable>
            </TableHead>

            <TableBody>
              {pageRows.map(row => (
                <TableRow
                  key={row.id ?? uuidv4()}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "action.hover" },
                    transition: "background-color 0.2s",
                  }}
                >
                  {visibleColumns.map(col => (
                    <TableCell key={col}>
                      {editingIds.has(row.id) ? (
                        <TextField
                          size="small"
                          value={(edits[row.id]?.[col] ?? row[col] ?? "")}
                          onChange={e => {
                            const val =
                              col === "age"
                                ? isNaN(Number(e.target.value))
                                  ? e.target.value
                                  : Number(e.target.value)
                                : e.target.value;
                            setEditField(row.id, col, val);
                          }}
                        />
                      ) : (
                        <div onDoubleClick={() => startEdit(row.id)}>
                          {row[col] ?? ""}
                        </div>
                      )}
                    </TableCell>
                  ))}

                  <TableCell>
                    <Tooltip title="Edit Row">
                      <IconButton onClick={() => startEdit(row.id)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Row">
                      <IconButton
                        onClick={() => confirmDeleteId(row.id)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DragDropContext>

      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
      
      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this row? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={doDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
