import { useCallback, useMemo, useState } from "react";
import { createBaseUrl } from "../clip/v1/createBaseUrl";

export interface HueConnection {
  baseUrl: string | "";
  username: string | false;
  appname: string | false;
}

const useConnection = () => {
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
    [setState]
  );

  const disconnect = useCallback(() => {
    localStorage.clear();
    setState({} as HueConnection);
  }, [setState]);

  return useMemo(
    () => ({ ...state, disconnect, initialize, connected: !!state.baseUrl }),
    [initialize, disconnect, state]
  );
};

export default useConnection;
