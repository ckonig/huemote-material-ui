import { RawGroupsResponse, RawLightsResponse, SensorRootObject } from "./Common";
import {
  createBaseUrl,
  fetchConfig,
  fetchGroups,
  fetchLights,
  fetchScenes,
  fetchSensorsAndSwitches,
} from "./API";

import React from "react";

export interface IHueState {
  baseUrl: string | false;
  username: string | false;
  appname: string | false;
  lights: RawLightsResponse;
  groups: RawGroupsResponse;
  sensors: SensorRootObject;
  switches: SensorRootObject;
  scenes: any;
  config: any;
  setBaseUrl?: (ip: string) => void;
  setAppname?: (a: string) => void;
  setUsername?: (u: string) => void;
  setLights?: (obj: RawLightsResponse) => void;
  setGroups?: (obj: RawGroupsResponse) => void;
  setSensors?: (obj: SensorRootObject) => void;
  setSwitches?: (obj: SensorRootObject) => void;
  setScenes?: (obj: any) => void;
  setConfig?: (obj: any) => void;
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
  const [lights, setLights] = React.useState<RawLightsResponse>({});
  const [groups, setGroups] = React.useState<RawGroupsResponse>({});
  const [sensors, setSensors] = React.useState<SensorRootObject>({});
  const [switches, setSwitches] = React.useState<SensorRootObject>({});
  const [scenes, setScenes] = React.useState<any>({});
  const [config, setConfig] = React.useState<any>({});
  return {
    baseUrl,
    setBaseUrl,
    username,
    setUsername,
    appname,
    setAppname,
    lights,
    setLights,
    groups,
    setGroups,
    sensors,
    setSensors,
    switches,
    setSwitches,
    scenes,
    setScenes,
    config,
    setConfig,
  };
};

export interface IHueContext {
  state: IHueState;
  refresh: () => void;
  disconnect: () => void;
  initialize: (ip: string, username: string, appname: string) => void;
}

const _refresh = (state: IHueState, baseUrl: string) => {
  state.setLights && fetchLights(baseUrl, state.setLights);
  state.setScenes && fetchScenes(baseUrl, state.setScenes);
  state.setGroups && fetchGroups(baseUrl, state.setGroups);
  state.setSensors &&
    state.setSwitches &&
    fetchSensorsAndSwitches(baseUrl, state.setSensors, state.setSwitches);
  state.setConfig && fetchConfig(baseUrl, state.setConfig);
};

export const disconnect = (state: IHueState) => {
  localStorage.clear();
  state.setBaseUrl && state.setBaseUrl("");
  state.setUsername && state.setUsername("");
  state.setLights && state.setLights({});
  state.setScenes && state.setScenes({});
  state.setGroups && state.setGroups({});
  state.setSensors && state.setSensors({});
  state.setConfig && state.setConfig({});
};

export const refresh = (state: IHueState) => {
  if (state && state.baseUrl) {
    _refresh(state, state.baseUrl || "");
  }
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
  _refresh(state, baseUrl);
};

export const HueContext = React.createContext<IHueContext>({
  state: {
    baseUrl: false,
    username: false,
    appname: false,
    lights: {},
    groups: {},
    sensors: {},
    switches: {},
    scenes: {},
    config: {},
  },
  refresh: () => {},
  initialize: () => {},
  disconnect: () => {},
});

export const useHueContext = () => React.useContext(HueContext);
