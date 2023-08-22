"use client";
import { Snackbar } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { createContext, useState } from "react";

type SnackbarOptions = {
  message: string;
};

export const SnackContext = createContext<{
  snackbarOpen: boolean;
  openSnackBar: (option: SnackbarOptions) => void;
}>({ snackbarOpen: false, openSnackBar: () => {} });

export default function SnackbarProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [snackbarOpen, setSnackOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<SnackbarOptions>();
  function openSnackBar(options: SnackbarOptions) {
    setSnackOpen(true);
    setOptions(options);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <SnackContext.Provider value={{ snackbarOpen, openSnackBar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={500}
        onClose={() => setSnackOpen(false)}
        message={options?.message}
      />
    </SnackContext.Provider>
    </LocalizationProvider>

  );
}
