import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@material-ui/core";
import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import ConfirmationDialog from "./components/Setup";
import TabNav from "./components/TabNav";

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <TabNav />
          <ConfirmationDialog />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
