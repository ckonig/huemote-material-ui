import { useHueContext } from "../HueContext";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { SensorRootObject } from "../clip/v1/sensors";

//@todo merge these two functions
const groupSwitchesById = (switches: any) => {
  const dict: { [name: string]: any } = {};
  Object.keys(switches)
    .map((key) => switches[parseInt(key)])
    .forEach((sensor) => {
      if (sensor && sensor.uniqueid) {
        const sensorGroupId = sensor.uniqueid.substring(0, 26);

        const create = () => {
          if (!dict[sensorGroupId]) {
            dict[sensorGroupId] = {};
          }
        };
        if (sensor.type === "ZLLSwitch") {
          create();
          dict[sensorGroupId].model = sensor;
          dict[sensorGroupId].switch = sensor;
        }
      }
    });

  return dict;
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
          dict[sensorGroupId].model = sensor;
          dict[sensorGroupId].name = sensor.name;
          dict[sensorGroupId].presence = sensor;
        }
      }
    });
  return dict;
};

const useAccessories = () => {
  const {
    state: { baseUrl },
  } = useHueContext();
  const initialData = {} as SensorRootObject;
  const query = useQuery<SensorRootObject, any>(`${baseUrl}/sensors`, {
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/sensors`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialData,
  });

  return useMemo(
    () => ({
      sensors: groupSensorsById(query.data || initialData),
      switches: groupSwitchesById(query.data || initialData),
    }),
    [initialData, query]
  );
};
export default useAccessories;
