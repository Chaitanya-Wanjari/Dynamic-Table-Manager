"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { store, persistor, RootState } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
import "./globals.css";
import HeaderAppBar from "../components/HeaderAppBar";



function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((s: RootState) => s.table.theme);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          ...(theme === "light"
            ? {
                background: { default: "#f7f9fb", paper: "#ffffff" },
                primary: { main: "#1976d2" },
              }
            : {
                background: { default: "#121212", paper: "#1e1e1e" },
                primary: { main: "#90caf9" },
              }),
        },
        typography: {
          fontFamily: "Inter, 'Segoe UI', Roboto, sans-serif",
          h4: { fontWeight: 600 },
          h6: { fontWeight: 500 },
        },
        shape: { borderRadius: 10 },
        transitions: {
          duration: { enteringScreen: 300, leavingScreen: 200 },
        },
      }),
    [theme]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <HeaderAppBar />

      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
            {children}
          </Container>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <html lang="en">
        <body>
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Inter, sans-serif",
              color: "#555",
            }}
          >
            Loading interface...
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppThemeProvider>{children}</AppThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
