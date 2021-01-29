import { RawGroupsResponse, RawLightsResponse } from "./Common";

export const createBaseUrl = (ip: string, token: string) =>
  `http://${ip}/api/${token}`;

export const myFetch = (url: string) =>
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error("Network request failed");
      }
      return response;
    })
    .then((d) => d.json());

export const fetchLights = (
  baseUrl: string,
  setData: (d: RawLightsResponse) => void
) => {
  myFetch(`${baseUrl}/lights`).then((d) => setData(d));
};
export const fetchScenes = (baseUrl: string, setData: (d: any) => void) => {
  myFetch(`${baseUrl}/scenes`).then((d) => setData(d));
};
export const fetchGroups = (
  baseUrl: string,
  setData: (d: RawGroupsResponse) => void
) => {
  myFetch(`${baseUrl}/groups`).then((d) => setData(d));
};
export const fetchSensors = (baseUrl: string, setData: (d: any) => void) => {
  myFetch(`${baseUrl}/sensors`).then((d) => setData(groupSensorsById(d)));
};
export const shutDown = (baseUrl: string) => {
  return fetch(`${baseUrl}/groups/0/action`, {
    method: "put",
    body: JSON.stringify({ on: false }),
  });
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
