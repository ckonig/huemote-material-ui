import { CssBaseline, ThemeProvider, createTheme } from "@material-ui/core";
import {
  HueContext,
  disconnect,
  initialize,
  useDefaultHueState,
} from "./HueContext";

import { BrowserRouter } from "react-router-dom";
import ConfirmationDialog from "./Setup";
import React from "react";
import TabNav from "./TabNav";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const hueState = useDefaultHueState();
  const hueContext = {
    state: hueState,
    initialize: (ip: string, username: string, appname: string) =>
      initialize(hueState, ip, username, appname),
    disconnect: () => disconnect(hueState),
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HueContext.Provider value={hueContext}>
          <BrowserRouter>
            {hueContext.state.baseUrl && <TabNav />}
            <ConfirmationDialog />
          </BrowserRouter>
        </HueContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
