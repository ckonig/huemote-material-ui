import {
  CssBaseline,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
  useMediaQuery,
  adaptV4Theme,
} from "@mui/material";
import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import ConfirmationDialog from "./components/Setup";
import TabNav from "./components/TabNav";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme(adaptV4Theme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      })),
    [prefersDarkMode]
  );
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <TabNav />
            <ConfirmationDialog />
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}

export default App;
