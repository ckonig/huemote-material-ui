import { useHueContext } from "../HueContext";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { Config } from "../clip/v1/config";

const useConfig = () => {
  const {
    state: { baseUrl },
  } = useHueContext();
  const initialData = useMemo(() => ({} as Config), []);
  const query = useQuery<Config, any>(`${baseUrl}/config`, {
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/config`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialData,
  });

  return useMemo(
    () => ({
      config: query.data || initialData,
    }),
    [initialData, query]
  );
};
export default useConfig;
