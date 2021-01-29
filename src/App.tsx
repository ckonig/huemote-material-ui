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
import useMediaQuery from "@material-ui/core/useMediaQuery";

function App() {
  const hueState = useDefaultHueState();
  const hueContext = {
    state: hueState,
    refresh: () => refresh(hueState),
    initialize: (baseUrl: string) => initialize(hueState, baseUrl),
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
        <TabNav />
        <ConfirmationDialog open={true} />
      </HueContext.Provider>
    </ThemeProvider>
  );
}

export default App;
