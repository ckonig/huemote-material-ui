import { useQuery } from "react-query";
import { useMemo } from "react";
import { SensorObject, SensorRootObject } from "../clip/v1/sensors";
import useConnection from "./useConnection";

const useAccessories = () => {
  const { baseUrl } = useConnection();
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

  const filterByType = (accessories: SensorRootObject, type: string) =>
    Object.keys(accessories)
      .filter((key) => accessories[key].type === type)
      .map((key) => accessories[key]);

  const filterById = (sensors: SensorObject[], id: string) =>
    sensors.filter((s) => s.uniqueid.substring(0, 26) === id.substring(0, 26));

  const getUniqueId = (id: string) => id.substring(0, 26);

  return useMemo(
    () => ({
      filterByType,
      filterById,
      getUniqueId,
      accessories: query.data || initialData,
    }),
    [initialData, query]
  );
};
export default useAccessories;
