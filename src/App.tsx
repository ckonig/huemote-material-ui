import "./App.css";
import "./react-toggle.css";
import "react-tabs/style/react-tabs.css";

import { RawGroupsResponse, RawLightsResponse } from "./Common";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
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

const groupSensorsById = (sensors: any) => {
  const dict: { [name: string]: any } = {};
  Object.keys(sensors)
    .map((key) => sensors[parseInt(key)])
    .forEach((sensor) => {
      if (sensor && sensor.uniqueid) {
        const sensorGroupId = sensor.uniqueid.substring(0, 26);

        const create = () => {
          if (!dict[sensorGroupId]) {
            dict[sensorGroupId] = {};
          }
        };
        if (sensor.type === "ZLLTemperature") {
          create();
          dict[sensorGroupId].temperature = sensor;
        }
        if (sensor.type === "ZLLLightLevel") {
          create();
          dict[sensorGroupId].light = sensor;
        }
        if (sensor.type === "ZLLPresence") {
          create();
          dict[sensorGroupId].name = sensor.name;
          dict[sensorGroupId].presence = sensor;
        }
      }
    });
  return dict;
};

function App() {
  const [lights, setLights] = React.useState<RawLightsResponse>({});
  const [groups, setGroups] = React.useState<RawGroupsResponse>({});
  const [sensors, setSensors] = React.useState<any>({});
  const [scenes, setScenes] = React.useState<any>({});
  const refresh = () => {
    fetchLights(setLights);
    fetchScenes(setScenes);
    fetchGroups(setGroups);
    fetchSensors((s) => setSensors(groupSensorsById(s)));
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
  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <button
          style={{
            outline: "none",
            border: "none",
            width: 50,
            height: 50,
            paddingTop: 0,
            marginBottom: 15,
          }}
          onClick={() => shutDown().then(refresh)}
        >
          <h1 style={{}}>
            <i className={"fa fa-power-off"} />
          </h1>
        </button>
      </div>
      <Tabs onSelect={refresh}>
        <TabList>
          {tabs.map((tab, ti) => (
            <Tab key={ti} style={{ fontSize: "0.9em" }}>
              <i className={"fa " + tab.icon} />
              &nbsp; {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanel>
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
        <TabPanel>
          @todo reuse Room Component to control lights per room
        </TabPanel>
        <TabPanel>
          <div>
            {Object.keys(sensors)
              .map((key) => sensors[key])
              .map((sensor, si) => (
                <Sensor key={si} model={sensor} />
              ))}
          </div>
        </TabPanel>
        <TabPanel>@todo configurable bridge connection</TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
