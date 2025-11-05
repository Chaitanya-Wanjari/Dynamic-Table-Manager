"use client";

import React, { useState } from "react";
import { Paper, Divider, Typography, Box, Stack } from "@mui/material";
import ImportExportButtons from "../components/ImportExportButtons";
import ExportJSONButton from "../components/ExportJSONButton";
import DataTable from "../components/DataTable";
import ManageColumnsModal from "../components/ManageColumnsModal";
import AddRowModal from "../components/AddRowModal";
import SummaryBar from "../components/SummaryBar";
import FiltersPanel from "../components/FiltersPanel";
import ResetButton from "../components/ResetButton";

export default function Page() {
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [ageRange, setAgeRange] = useState<number[]>([18, 70]);
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Manage Table</Typography>
        <Stack direction="row" spacing={1}>
          <AddRowModal />
          <ManageColumnsModal />
          <ExportJSONButton />
          <ResetButton />
        </Stack>
      </Box>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Import, edit, hide, or export columns dynamically. Changes persist automatically.
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <FiltersPanel roleFilter={roleFilter} setRoleFilter={setRoleFilter} ageRange={ageRange} setAgeRange={setAgeRange} />

      <SummaryBar filteredCount={0} />

      <ImportExportButtons />
      <DataTable
      />
    </Paper>
  );
}

