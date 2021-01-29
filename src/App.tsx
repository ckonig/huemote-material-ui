import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { HueContext, refresh, useDefaultHueState } from "./HueContext";

import React from "react";
import TabNav from "./TabNav";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function App() {
  const hueState = useDefaultHueState();
  const hueContext = { state: hueState, refresh: () => refresh(hueState) };
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
      </HueContext.Provider>
    </ThemeProvider>
  );
}

export default App;
