import { Button, Icon, IconButton, Theme, makeStyles } from "@material-ui/core";

import React from "react";
import Rooms from "./Rooms";
import Sensor from "./Sensor";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import Tabs from "@material-ui/core/Tabs";
import { shutDown } from "./API";
import { useHueContext } from "./HueContext";

function TabNav() {
  const {
    state: { lights, groups, sensors, scenes, baseUrl },
    refresh,
    disconnect,
  } = useHueContext();

  //@todo use react router https://stackoverflow.com/questions/41638688/material-uis-tabs-integration-with-react-router-4/41654699

  const tabs = [
    { icon: "fa-photo-video", label: "Scenes" },
    { icon: "fa-lightbulb", label: "Lights" },
    { icon: "fa-random", label: "Switches" },
    { icon: "fa-thermometer-half", label: "Sensors" },
    { icon: "fa-plug", label: "Bridge" },
  ];
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    refresh();
  };
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
          onClick={() => baseUrl && shutDown(baseUrl).then(refresh)}
        >
          <Icon className={"fa fa-power-off"} />
        </IconButton>
      </div>
      <Tabs
        onChange={handleTabChange}
        scrollButtons="auto"
        variant="scrollable"
        className={classes.wrapper}
        value={value}
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
        @todo show bridge and connection details
        <Button
          endIcon={<Icon className="fa fa-trash" />}
          variant="contained"
          color="secondary"
          onClick={() => {
            if (window.confirm("disconnect from bridge and delete data?")) {
              disconnect();
            }
          }}
        >
          Disconnect from Bridge
        </Button>
      </TabPanel>
    </div>
  );
}

export default TabNav;
