import "./App.css";
import "./battery.scss";
import "./react-toggle.css";

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
const fetchGroups = (setData: (d: RawGroupsResponse) => void) => {
  myFetch(`${baseUrl}/groups`).then((d) => setData(d));
};
const fetchSensors = (setData: (d: any) => void) => {
  myFetch(`${baseUrl}/sensors`).then((d) => setData(d));
};

const Room = (props: {
  id: string;
  model: GroupsResponseObj;
  lights: RawLightsResponse;
  refresh: () => void;
}) => {
  const toggle = React.useCallback(() => {
    const payload = { on: false };
    if (props.model.state.any_on) {
      console.log("toggle off");
      payload.on = false;
    } else {
      console.log("toggle on");
      payload.on = true;
    }
    fetch(`${baseUrl}/groups/${props.id}/action`, {
      method: "put",
      body: JSON.stringify(payload),
    }).then(() => props.refresh());
  }, [props]);

  if (props.model.type !== "Room") {
    return null;
  }

  return (
    <div
      style={{
        float: "left",
        width: "170px",
        height: "45px",
        margin: 2,
        borderWidth: "2px",
        borderStyle: "solid",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", left: 10, top: 10 }}>
        <span>{props.model.name}</span>
      </div>
      <div style={{ position: "absolute", right: 10, top: 10 }}>
        <Toggle
          icons={false}
          defaultChecked={props.model.state.any_on}
          onChange={() => toggle()}
        />
      </div>
    </div>
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

function App() {
  const [lights, setLights] = React.useState<RawLightsResponse>({});
  const [groups, setGroups] = React.useState<RawGroupsResponse>({});
  const [sensors, setSensors] = React.useState<any>({});
  React.useEffect(() => {
    fetchLights(setLights);
    fetchGroups(setGroups);
    fetchSensors((s) => setSensors(groupSensorsById(s)));
  }, []);
  React.useEffect(() => {
    console.log(lights);
  }, [lights]);
  return (
    <div>
      <h1>Hue React</h1>
      <h2>Sensors</h2>
      <ul>
        {Object.keys(sensors)
          .map((key) => sensors[key])
          .map((sensor) => (
            <li>
              {sensor.name} {sensor.temperature.state.temperature / 100}°C
              <div className="battery">
                <div
                  className="battery-level"
                  style={{ height: sensor.presence.config.battery + "%" }}
                ></div>
              </div>
              <span>{sensor.presence.config.battery}%</span>
            </li>
          ))}
      </ul>
      <h2>Insta Switch</h2>
      {Object.keys(groups)
        .map((key) => ({ key: key, ...groups[parseInt(key)] }))
        .map((elem, id) => (
          <Room
            id={elem.key}
            key={id}
            model={elem}
            lights={lights}
            refresh={() => fetchGroups(setGroups)}
          />
        ))}
    </div>
  );
}

export default App;
