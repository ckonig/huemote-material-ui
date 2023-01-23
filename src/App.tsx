import { CssBaseline, ThemeProvider, createTheme } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import ConfirmationDialog from "./components/Setup";
import { useMemo } from "react";
import TabNav from "./components/TabNav";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { QueryClient, QueryClientProvider } from "react-query";

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
