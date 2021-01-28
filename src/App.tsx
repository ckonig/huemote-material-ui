import "./App.css";
import "./battery.scss";
import "./react-toggle.css";
import "react-tabs/style/react-tabs.css";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import React from "react";
import Toggle from "react-toggle";

interface LightsReponseObj {
  capabilities: any;
  config: any;
  manufacturername: string;
  modelid: string;
  name: string;
  productid: string;
  productname: string;
  state: any;
  type: string;
}
type RawLightsResponse = { [name: number]: LightsReponseObj };

interface GroupsResponseObj {
  class: string;
  lights: string[];
  name: string;
  sensors: any[];
  type: string;
  state: any;
}
type RawGroupsResponse = {
  [name: number]: GroupsResponseObj;
};
const token = "k18GlHU2RI75DE1rDBGU87M5mQK0lLpj7hvVunxx";
const ip = "192.168.178.71";
const baseUrl = `http://${ip}/api/${token}`;

const myFetch = (url: string) =>
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error("Network request failed");
      }
      return response;
    })
    .then((d) => d.json());

const fetchLights = (setData: (d: RawLightsResponse) => void) => {
  myFetch(`${baseUrl}/lights`).then((d) => setData(d));
};
const fetchScenes = (setData: (d: any) => void) => {
  myFetch(`${baseUrl}/scenes`).then((d) => setData(d));
};
const fetchGroups = (setData: (d: RawGroupsResponse) => void) => {
  myFetch(`${baseUrl}/groups`).then((d) => setData(d));
};
const fetchSensors = (setData: (d: any) => void) => {
  myFetch(`${baseUrl}/sensors`).then((d) => setData(d));
};

const roomToFa = (room: string) => {
  switch (room) {
    case "Living room":
      return "fa-tv";
    case "Bathroom":
      return "fa-toilet-paper";
    case "Bedroom":
      return "fa-bed";
    case "Balcony":
      return "fa-tree";
    case "Plants":
      return "fa-seedling";
    case "Kitchen":
      return "fa-coffee";
    case "Entrance":
      return "fa-shoe-prints";
    case "Office":
      return "fa-laptop-house";
  }
  console.error("no icon for room:" + room);
};

const Room = (props: {
  id: string;
  model: GroupsResponseObj;
  lights: RawLightsResponse;
  scenes: any;
  refresh: () => void;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const toggle = React.useCallback(() => {
    const payload = { on: !props.model.state.any_on };

    fetch(`${baseUrl}/groups/${props.id}/action`, {
      method: "put",
      body: JSON.stringify(payload),
    }).then(() => props.refresh());
  }, [props]);

  if (props.model.type !== "Room") {
    return null;
  }

  const hueToFa = (hue: string) => {
    switch (hue) {
      case "Living room":
        return "fa-tv";
      case "Bathroom":
        return "fa-toilet-paper";
      case "Bedroom":
        return "fa-bed";
      case "Balcony":
        return "fa-tree";
      case "Garden":
        return "fa-seedling";
      case "Kitchen":
        return "fa-coffee";
      case "Front door":
        return "fa-shoe-prints";
      case "Reading":
        return "fa-laptop-house";
    }
    console.error("no icon for class:" + hue);
  };

  const getScenes = () => {
    return Object.keys(props.scenes)
      .map((key) => ({
        key,
        ...props.scenes[key],
      }))
      .filter(
        (scene) =>
          scene.group &&
          scene.group === props.id &&
          scene.type === "GroupScene" &&
          !scene.recycle &&
          scene.locked
      );
  };

  return (
    <button
      className="myButton"
      onClick={(e: any) =>
        (!e.target.className ||
          e.target.className.substring(0, 12) !== "react-toggle") &&
        setExpanded(!expanded)
      }
      style={{
        borderRadius: "0.25em",
        fontSize: "1.5em",
        float: "left",
        width: 250,
        minHeight: expanded ? 143 : 45,
        margin: 2,
        borderWidth: 2,
        borderStyle: "solid",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", left: 10, top: 7.5 }}>
        <i
          style={{ fontSize: "1em", width: 30 }}
          className={`fa ${hueToFa(props.model.class)}`}
        ></i>
        <span style={{ marginLeft: 10 }}>{props.model.name}</span>
      </div>
      <div style={{ position: "absolute", right: 10, top: 10 }}>
        <Toggle
          icons={false}
          defaultChecked={props.model.state.any_on}
          onChange={() => toggle()}
        />
      </div>
      {expanded && (
        <div style={{ position: "absolute", top: 25 }}>
          <ul>
            {getScenes().map((scene) => (
              <li>{scene.name}</li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};

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

const Thermometer = (props: { temp: string }) => {
  return (
    <div
      style={{
        fontSize: "2em",
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
      }}
      className="thermometer"
    >
      {props.temp}°C
    </div>
  );
};

function App() {
  const [lights, setLights] = React.useState<RawLightsResponse>({});
  const [groups, setGroups] = React.useState<RawGroupsResponse>({});
  const [sensors, setSensors] = React.useState<any>({});
  const [scenes, setScenes] = React.useState<any>({});
  const [tab, setTab] = React.useState(0);
  React.useEffect(() => {
    fetchLights(setLights);
    fetchScenes(setScenes);
    fetchGroups(setGroups);
    fetchSensors((s) => setSensors(groupSensorsById(s)));
  }, []);
  React.useEffect(() => {
    console.log(scenes);
  }, [scenes]);
  const tabs = [
    { icon: "fa-home", label: "Rooms" },
    { icon: "fa-thermometer-half", label: "Sensors" },
  ];
  return (
    <div style={{ maxWidth: 518 }}>
      <h1 style={{ textAlign: "center" }}>
        <i className={"fa " + tabs[tab].icon} />
      </h1>
      <Tabs onSelect={(i: number) => setTab(i)}>
        <TabList>
          {tabs.map((tab) => (
            <Tab>
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
                refresh={() => fetchGroups(setGroups)}
              />
            ))}
        </TabPanel>

        <TabPanel>
          <div>
            {Object.keys(sensors)
              .map((key) => sensors[key])
              .map((sensor) => (
                <div
                  style={{
                    fontSize: "1em",
                    borderRadius: "0.25em",
                    position: "relative",
                    borderStyle: "solid",
                    borderWidth: 2,
                    margin: 2,
                    float: "left",
                    width: 250,
                    height: 80,
                  }}
                >
                  <div
                    style={{
                      fontSize: "2em",
                      position: "absolute",
                      left: 10,
                      top: 18,
                    }}
                  >
                    <i
                      className={"fa " + roomToFa(sensor.name.split(" ")[0])}
                    ></i>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      top: 10,
                    }}
                  >
                    {sensor.name.split(" ")[0]}
                  </div>

                  <div
                    className="battery"
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 8,
                    }}
                  >
                    <div
                      className="battery-level"
                      style={{ height: sensor.presence.config.battery + "%" }}
                    ></div>
                  </div>
                  <Thermometer
                    temp={`${Math.round(
                      sensor.temperature.state.temperature / 100
                    ).toFixed(2)}`}
                  />
                </div>
              ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
