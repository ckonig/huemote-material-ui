import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import {
  HueContext,
  disconnect,
  initialize,
  refresh,
  useDefaultHueState,
} from "./HueContext";

import ConfirmationDialog from "./ConfirmationDialog";
import React from "react";
import TabNav from "./TabNav";
import { createBaseUrl } from "./API";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function App() {
  const hueState = useDefaultHueState();
  const hueContext = {
    state: hueState,
    refresh: () => refresh(hueState),
    initialize: (ip: string, username: string) =>
      initialize(hueState, ip, username),
    disconnect: () => disconnect(hueState),
  };
  React.useEffect(() => hueContext.refresh(), []);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HueContext.Provider value={hueContext}>
        {hueContext.state.baseUrl && <TabNav />}
        <ConfirmationDialog />
      </HueContext.Provider>
    </ThemeProvider>
  );
}

export default App;
