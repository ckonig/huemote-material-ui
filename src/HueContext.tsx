import React from "react";
import { createBaseUrl } from "./clip/v1/createBaseUrl";

export interface IHueState {
  baseUrl: string | false;
  username: string | false;
  appname: string | false;
  setBaseUrl?: (ip: string) => void;
  setAppname?: (a: string) => void;
  setUsername?: (u: string) => void;
}

export const useDefaultHueState = () => {
  const [baseUrl, setBaseUrl] = React.useState<string | false>(
    localStorage.getItem("baseUrl") || false
  );
  const [username, setUsername] = React.useState<string | false>(
    localStorage.getItem("username") || false
  );
  const [appname, setAppname] = React.useState<string | false>(
    localStorage.getItem("appname") || false
  );

  return {
    baseUrl,
    setBaseUrl,
    username,
    setUsername,
    appname,
    setAppname,
  };
};

export interface IHueContext {
  state: IHueState;
  disconnect: () => void;
  initialize: (ip: string, username: string, appname: string) => void;
}

export const disconnect = (state: IHueState) => {
  localStorage.clear();
  state.setBaseUrl && state.setBaseUrl("");
  state.setUsername && state.setUsername("");
};

export const initialize = (
  state: IHueState,
  ip: string,
  username: string,
  appname: string
) => {
  const baseUrl = createBaseUrl(ip, username);
  state.setBaseUrl && state.setBaseUrl(baseUrl);
  state.setUsername && state.setUsername(username);
  state.setAppname && state.setAppname(appname);
  localStorage.setItem("baseUrl", baseUrl);
  localStorage.setItem("username", username);
  localStorage.setItem("appname", appname);
};

export const HueContext = React.createContext<IHueContext>({
  state: {
    baseUrl: false,
    username: false,
    appname: false,
  },
  initialize: () => {},
  disconnect: () => {},
});

export const useHueContext = () => React.useContext(HueContext);
