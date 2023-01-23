import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { createBaseUrl } from "../clip/v1/createBaseUrl";
import { Bridge } from "../clip/v1/setup";

export const useBridgeDiscovery = () => {
  const initialData = useMemo(() => ({} as Bridge[]), []);
  const query = useQuery<Bridge[], any>("https://discovery.meethue.com/", {
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
    initialData,
  });

  return useMemo(
    () => ({
      bridges: query,
    }),
    [query]
  );
};

export interface HueConnection {
  baseUrl: string | false;
  username: string | false;
  appname: string | false;
}

export const useConnection = () => {
  const [state, setState] = useState<HueConnection>(
    JSON.parse(localStorage.getItem("config") || "{}") as HueConnection
  );
  const initialize = useCallback(
    (ip: string, username: string, appname: string) => {
      const baseUrl = createBaseUrl(ip, username);
      const newState = { baseUrl, username, appname };
      localStorage.setItem("config", JSON.stringify(newState));
      setState(newState);
    },
    []
  );
  return useMemo(
    () => ({
      connected: !!state.baseUrl,
      baseUrl: state.baseUrl,
      appname: state.appname,
      connect: () => {}, //@todo
      disconnect: () => {
        localStorage.clear();
        setState({} as HueConnection);
      },
      initialize,
    }),
    [initialize, state]
  );
};
