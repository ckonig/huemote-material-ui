import "./App.css";
import "./react-toggle.css";

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
import Room from "./Room";
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
  const tabs = [
    { icon: "fa-photo-video", label: "Scenes" },
    { icon: "fa-lightbulb", label: "Lights" },
    { icon: "fa-thermometer-half", label: "Sensors" },
    { icon: "fa-cookie-bite", label: "Data" },
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
        scrollButtons="on"
        variant="scrollable"
        className={classes.wrapper}
        value={value}
      >
        {tabs.map((tab, ti) => (
          <Tab
            key={ti}
            style={{ fontSize: "0.9em", width: 75 }}
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
        {Object.keys(groups)
          .map((key) => ({ key: key, ...groups[parseInt(key)] }))
          .map((elem, id) => (
            <Room
              id={elem.key}
              key={id}
              model={elem}
              lights={lights}
              scenes={scenes}
              refresh={() => refresh()}
            />
          ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        @todo reuse Room Component to control lights per room
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          {Object.keys(sensors)
            .map((key) => sensors[key])
            .map((sensor, si) => (
              <Sensor key={si} model={sensor} />
            ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        @todo configurable bridge connection
      </TabPanel>
    </div>
  );
}

export default TabNav;
