import { useMemo } from "react";
import { useQuery } from "react-query";
import { Bridge } from "../clip/v1/setup";

export const useBridgeDiscovery = () => {
  const initialData = useMemo(() => ({} as Bridge[]), []);
  const query = useQuery<Bridge[], any>("https://discovery.meethue.com/", {
    queryFn: async () => {
      const response = await fetch("https://discovery.meethue.com/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialData,
  });

  return useMemo(
    () => ({
      bridges: query.data || initialData,
    }),
    [initialData, query]
  );
};
