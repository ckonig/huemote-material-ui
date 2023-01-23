import { useCallback, useMemo } from "react";
import { SensorObject, SENSOR_TYPES } from "../clip/v1/sensors";
import useAccessories from "../queries/useAccessories";
import { Sensor } from "./models";

export const useSensors = () => {
  const { accessories, filterByType, filterById, getUniqueId } =
    useAccessories();
  const filter = useCallback(
    (type: string, s: SensorObject) =>
      filterById(filterByType(accessories, type), s.uniqueid)[0],
    [filterById, filterByType, accessories]
  );
  return useMemo<{ sensors: Sensor[] }>(
    () => ({
      sensors: filterByType(accessories, SENSOR_TYPES.Presence).map((s) => ({
        name: s.name,
        deviceid: getUniqueId(s.uniqueid),
        presence: s,
        lightLevel: filter(SENSOR_TYPES.LightLevel, s),
        temperature: filter(SENSOR_TYPES.Temperature, s),
      })),
    }),
    [accessories, filter, filterByType, getUniqueId]
  );
};
