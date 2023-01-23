import { useMemo } from "react";
import {
  SensorObject,
  SensorRootObject,
  SENSOR_TYPES,
} from "../clip/v1/sensors";
import useAccessories from "../queries/accessories";

export interface Sensor {
  name: string;
  deviceid: string;
  lightLevel: SensorObject;
  temperature: SensorObject;
  presence: SensorObject;
}

export const useSensors = () => {
  const { accessories } = useAccessories();
  return useMemo<{ sensors: Sensor[] }>(
    () => ({
      sensors: filterByType(accessories, SENSOR_TYPES.Presence).map((s) => ({
        name: s.name,
        deviceid: s.uniqueid.substring(0, 26),
        presence: s,
        lightLevel: filterById(
          filterByType(accessories, SENSOR_TYPES.LightLevel),
          s.uniqueid
        )[0],
        temperature: filterById(
          filterByType(accessories, SENSOR_TYPES.Temperature),
          s.uniqueid
        )[0],
      })),
    }),
    [accessories]
  );
};

const filterByType = (accessories: SensorRootObject, type: string) => {
  return Object.keys(accessories)
    .filter((key) => accessories[key].type === type)
    .map((key) => accessories[key]);
};

const filterById = (sensors: SensorObject[], id: string) => {
  return sensors.filter(
    (s) => s.uniqueid.substring(0, 26) === id.substring(0, 26)
  );
};

export interface DimmerSwitch {}

export interface TapSwitch {}
