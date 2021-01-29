import {
  Icon,
  IconButton,
  Theme,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { RawGroupsResponse, RawLightsResponse } from "./Common";
import {
  fetchGroups,
  fetchLights,
  fetchScenes,
  fetchSensors,
  shutDown,
} from "./API";

import React from "react";
import Rooms from "./Rooms";
import Sensor from "./Sensor";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import Tabs from "@material-ui/core/Tabs";

function TabNav() {
  const [lights, setLights] = React.useState<RawLightsResponse>({});
  const [groups, setGroups] = React.useState<RawGroupsResponse>({});
  const [sensors, setSensors] = React.useState<any>({});
  const [scenes, setScenes] = React.useState<any>({});
  const refresh = () => {
    //@todo move to HueContext
    fetchLights(setLights);
    fetchScenes(setScenes);
    fetchGroups(setGroups);
    fetchSensors(setSensors);
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    refresh();
  };

  React.useEffect(() => {
    refresh();
  }, []);

  React.useEffect(() => {
    console.log(sensors);
  }, [sensors]);

  //@todo use react router https://stackoverflow.com/questions/41638688/material-uis-tabs-integration-with-react-router-4/41654699
  
  const tabs = [
    { icon: "fa-photo-video", label: "Scenes" },
    { icon: "fa-lightbulb", label: "Lights" },
    { icon: "fa-random", label: "Switches" },
    { icon: "fa-thermometer-half", label: "Sensors" },
    { icon: "fa-plug", label: "Bridge" },
  ];
  const [value, setValue] = React.useState(0);
  const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
      flexDirection: "row",
    },
  }));
  const classes = useStyles();

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <IconButton
          color="secondary"
          style={{
            outline: "none",
            border: "none",
            width: 50,
            height: 50,
            fontSize: "2em",
          }}
          onClick={() => shutDown().then(refresh)}
        >
          <Icon className={"fa fa-power-off"} />
        </IconButton>
      </div>
      <Tabs
        onChange={handleChange}
        scrollButtons="auto"
        variant="scrollable"
        className={classes.wrapper}
        value={value}
      >
        {tabs.map((tab, ti) => (
          <Tab
            key={ti}
            style={{ fontSize: "0.9em", width: 85 }}
            label={
              <div>
                <Typography style={{ fontSize: 15 }}>
                  <Icon className={"fa " + tab.icon} />
                  &nbsp; {tab.label}
                </Typography>
              </div>
            }
          />
        ))}
      </Tabs>

      <TabPanel value={value} index={0}>
        <Rooms {...{ lights, scenes, groups, refresh }} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        @todo control lights per room
      </TabPanel>
      <TabPanel value={value} index={2}>
        @todo show switch battery states
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div>
          {Object.keys(sensors)
            .map((key) => sensors[key])
            .map((sensor, si) => (
              <Sensor key={si} model={sensor} />
            ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        @todo configurable bridge connection.
        if no connection exists, config dialog blocks all other elements
        config dialog also requests consent to use localstorage
        in this tab, disconnecting from bridge = removing localStorage is possible
      </TabPanel>
    </div>
  );
}

export default TabNav;
