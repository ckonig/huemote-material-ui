import { AppBar, Box, Icon } from "@mui/material";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Bridge from "./config/Bridge";
import Header from "./Header";
import Lights from "./control/Lights";
import { useCallback, ChangeEvent } from "react";
import Scenes from "./control/Scenes";
import Sensors from "./accessories/Sensors";
import SwipeableViews from "react-swipeable-views";
import Switches from "./accessories/Switches";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";
import Tabs from "@mui/material/Tabs";

const tabs = [
  { icon: "fa-photo-video", label: "Scenes", route: "/Scenes" },
  { icon: "fa-lightbulb", label: "Lights", route: "/Lights" },
  { icon: "fa-random", label: "Switches", route: "/Switches" },
  { icon: "fa-thermometer-half", label: "Sensors", route: "/Sensors" },
  { icon: "fa-plug", label: "Bridge", route: "/Bridge" },
];

function TabNav(props: RouteComponentProps<any>) {
  const getPathIndex = useCallback(() => {
    const found = tabs.findIndex((t) => t.route === props.location.pathname);
    return found > 0 ? found : 0;
  }, [props]);

  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    props.history.push(tabs[newValue].route);
    //@todo refresh
  };

  const handleSwipeTab = (newValue: number) => {
    props.history.push(tabs[newValue].route);
    //@todo refresh
  };

  return (
    <Box
      sx={{
        width: "100vw",
        maxWidth: 400,
        margin: "auto",
        height: "100vh",
      }}
    >
      <AppBar position="static" color="default">
        <Header />
        <Tabs
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
          sx={{ flexDirection: "row" }}
          value={getPathIndex()}
        >
          {tabs.map((tab, ti) => (
            <Tab
              key={ti}
              style={{ fontSize: "0.9em", width: 85 }}
              icon={<Icon className={"fa " + tab.icon} />}
              label={tab.label}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        style={{ height: "100%" }}
        containerStyle={{ height: "100%" }}
        index={getPathIndex()}
        onChangeIndex={handleSwipeTab}
        disableLazyLoading
        animateTransitions={false}
      >
        <TabPanel index={0}>
          <Scenes />
        </TabPanel>
        <TabPanel index={1}>
          <Lights />
        </TabPanel>
        <TabPanel index={2}>
          <Switches />
        </TabPanel>
        <TabPanel index={3}>
          <Sensors />
        </TabPanel>
        <TabPanel index={4}>
          <Bridge />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default withRouter(TabNav);
