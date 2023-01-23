import { useHueContext } from "../HueContext";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { SensorRootObject } from "../clip/v1/sensors";

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
      accessories: query.data || initialData,
    }),
    [initialData, query]
  );
};
export default useAccessories;
