"use client";

import React from "react";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setTheme } from "../store/tableSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((s: RootState) => s.table.theme);
  const toggle = () => dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  return (
    <IconButton onClick={toggle} size="large" title="Toggle theme">
      {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
