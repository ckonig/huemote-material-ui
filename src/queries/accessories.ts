import { useHueContext } from "../HueContext";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { SensorRootObject, SENSOR_TYPES } from "../clip/v1/sensors";

//@todo map to devices instead
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
        if (
          sensor.type === SENSOR_TYPES.DimmerSwitch ||
          sensor.type === SENSOR_TYPES.TapSwitch
        ) {
          create();
          dict[sensorGroupId].model = sensor;
          dict[sensorGroupId].switch = sensor;
        }
      }
    });

  return dict;
};

//@todo map to devices instead
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

        //@todo exclude CLIPGenericStatus sensors
        //@todo ignore DayLightSensor

        if (sensor.type === SENSOR_TYPES.Temperature) {
          create();
          dict[sensorGroupId].temperature = sensor;
        }
        if (sensor.type === SENSOR_TYPES.LightLevel) {
          create();
          dict[sensorGroupId].light = sensor;
        }
        if (sensor.type === SENSOR_TYPES.Presence) {
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
  const initialData = useMemo(() => ({} as SensorRootObject), []);
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
