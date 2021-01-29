import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";

import React from "react";
import TabNav from "./TabNav";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function App() {
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
      <TabNav />
    </ThemeProvider>
  );
}

export default App;
