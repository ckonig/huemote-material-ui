import { useQuery } from "react-query";
import { Bridge } from "../clip/v1/setup";

export const useBridgeDiscovery = () => {
  return useQuery<Bridge[], any>("https://discovery.meethue.com/", {
    enabled: false,
    queryFn: async () => {
      const response = await fetch("https://discovery.meethue.com/");
      if (!response.ok) {
        if (response.status === 429) {
          console.log("backing off from discovery");
          return "[]";
        } else {
          throw new Error("Network response was not ok");
        }
      }
      return response.json();
    },
    initialData: {} as Bridge[],
  });
};
