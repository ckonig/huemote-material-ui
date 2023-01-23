import { AppBar, Icon, Theme, makeStyles } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Bridge from "./Bridge";
import Header from "./Header";
import Lights from "./Lights";
import React from "react";
import Scenes from "./Scenes";
import Sensors from "./Sensors";
import SwipeableViews from "react-swipeable-views";
import Switches from "./Switches";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import Tabs from "@material-ui/core/Tabs";

const tabs = [
  { icon: "fa-photo-video", label: "Scenes", route: "/Scenes" },
  { icon: "fa-lightbulb", label: "Lights", route: "/Lights" },
  { icon: "fa-random", label: "Switches", route: "/Switches" },
  { icon: "fa-thermometer-half", label: "Sensors", route: "/Sensors" },
  { icon: "fa-plug", label: "Bridge", route: "/Bridge" },
];

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    flexDirection: "row",
  },
}));

function TabNav(props: RouteComponentProps<any>) {
  const getPathIndex = React.useCallback(() => {
    const found = tabs.findIndex((t) => t.route === props.location.pathname);
    return found > 0 ? found : 0;
  }, [props]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    props.history.push(tabs[newValue].route);
    //@todo refresh
  };

  const handleSwipeTab = (newValue: number) => {
    props.history.push(tabs[newValue].route);
    //@todo refresh
  };

  const classes = useStyles();

  return (
    <div
      style={{
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
          className={classes.wrapper}
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
    </div>
  );
}

export default withRouter(TabNav);
