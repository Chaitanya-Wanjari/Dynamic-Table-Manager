"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

export default function HeaderAppBar() {
  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        background: theme => theme.palette.mode === "dark"
          ? "linear-gradient(90deg,#071426,#0b3b4b,#0f5c77)"
          : "linear-gradient(90deg,#1976d2,#42a5f5)",
        mb: 3,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Dynamic Data Table Manager
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
