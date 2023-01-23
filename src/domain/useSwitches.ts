import { useMemo } from "react";
import { SENSOR_TYPES } from "../clip/v1/sensors";
import useAccessories from "../queries/useAccessories";
import { Switch } from "./models";

export const useSwitches = () => {
  const { accessories, filterByType, getUniqueId } = useAccessories();
  return useMemo<{ switches: Switch[] }>(
    () => ({
      switches: filterByType(accessories, SENSOR_TYPES.DimmerSwitch)
        .concat(filterByType(accessories, SENSOR_TYPES.TapSwitch))
        .map((s) => ({
          deviceid: getUniqueId(s.uniqueid),
          switch: s,
        })),
    }),
    [accessories, filterByType, getUniqueId]
  );
};
