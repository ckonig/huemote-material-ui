import { GroupsResponse } from "./clip/v1/groups";
import { SensorRootObject } from "./clip/v1/sensors";

export const createBaseUrl = (ip: string, token: string) =>
  `http://${ip}/api/${token}`;

export const myFetch: <T>(url: string) => Promise<T> = (url) =>
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error("Network request failed");
      }
      return response;
    })
    .then((d) => d.json());

export const fetchScenes = (baseUrl: string, setData: (d: any) => void) =>
  myFetch(`${baseUrl}/scenes`).then((d) => setData(d));

export const fetchConfig = (baseUrl: string, setData: (d: any) => void) =>
  myFetch(`${baseUrl}/config`).then((d) => setData(d));

export const fetchGroups = (
  baseUrl: string,
  setData: (d: GroupsResponse) => void
) => myFetch<GroupsResponse>(`${baseUrl}/groups`).then((d) => setData(d));

//@todo api store to avoid double requests
const _fetchSensors: (baseUrl: string) => Promise<SensorRootObject> = (
  baseUrl
) => myFetch(`${baseUrl}/sensors`);

//@todo reuse original structure?
export const fetchSensorsAndSwitches = (
  baseUrl: string,
  setSensors: (d: SensorRootObject) => void,
  setSwitches: (d: SensorRootObject) => void
) =>
  _fetchSensors(baseUrl).then((d) => {
    setSensors(groupSensorsById(d));
    setSwitches(groupSwitchesById(d));
  });

const groupSwitchesById = (switches: any) => {
  const dict: { [name: string]: any } = {};
  Object.keys(switches)
    .map((key) => switches[parseInt(key)])
    .forEach((sensor) => {
      if (sensor && sensor.uniqueid) {
        const sensorGroupId = sensor.uniqueid.substring(0, 26);

        const create = () => {
          if (!dict[sensorGroupId]) {
            dict[sensorGroupId] = { model: sensor };
          }
        };
        if (sensor.type === "ZLLSwitch") {
          create();
          dict[sensorGroupId].switch = sensor;
        }
      }
    });
  console.log("found: ", dict, switches);

  return dict;
};

//@todo continue to use own types.
//separate types for sensor and switch
//(sensor groups three sensors, switch has different properties)
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
          dict[sensorGroupId].model = sensor;
          dict[sensorGroupId].name = sensor.name;
          dict[sensorGroupId].presence = sensor;
        }
      }
    });
  return dict;
};
