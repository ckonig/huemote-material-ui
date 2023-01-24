import { useQuery } from "react-query";
import { useMemo } from "react";
import { SensorObject, SensorRootObject } from "../clip/v1/sensors";
import useQueryCache from "./useQueryCache";
import useApi from "../clip/v1/api";

const useAccessories = () => {
  const api = useApi();
  const cache = useQueryCache();
  const initialData = useMemo(() => ({} as SensorRootObject), []);
  const query = useQuery<SensorRootObject, any>(cache.keys.sensors, {
    queryFn: () => api.getSensors(),
    initialData,
  });

  return useMemo(() => {
    const getUniqueId = (id: string) => id.substring(0, 26);

    const filterByType = (accessories: SensorRootObject, type: string) =>
      Object.keys(accessories)
        .filter((key) => accessories[key].type === type)
        .map((key) => accessories[key]);

    const filterById = (sensors: SensorObject[], id: string) =>
      sensors.filter((s) => getUniqueId(s.uniqueid) === getUniqueId(id));

    return {
      filterByType,
      filterById,
      getUniqueId,
      accessories: query.data || initialData,
    };
  }, [initialData, query]);
};
export default useAccessories;
