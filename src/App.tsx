import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import {
  HueContext,
  disconnect,
  initialize,
  refresh,
  useDefaultHueState,
} from "./HueContext";

import { BrowserRouter } from "react-router-dom";
import ConfirmationDialog from "./Setup";
import React from "react";
import TabNav from "./TabNav";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function App() {
  const hueState = useDefaultHueState();
  const hueContext = {
    state: hueState,
    refresh: () => refresh(hueState),
    initialize: (ip: string, username: string, appname: string) =>
      initialize(hueState, ip, username, appname),
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
        <BrowserRouter>
          {hueContext.state.baseUrl && <TabNav />}
          <ConfirmationDialog />
        </BrowserRouter>
      </HueContext.Provider>
    </ThemeProvider>
  );
}

export default App;
