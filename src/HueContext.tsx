import { RawGroupsResponse, RawLightsResponse } from "./Common";
import {
  createBaseUrl,
  fetchGroups,
  fetchLights,
  fetchScenes,
  fetchSensors,
} from "./API";

import React from "react";

export interface IHueState {
  baseUrl: string | false;
  username: string | false;
  lights: RawLightsResponse;
  groups: RawGroupsResponse;
  sensors: any;
  scenes: any;
  setBaseUrl?: (ip: string) => void;
  setUsername?: (u: string) => void;
  setLights?: (obj: RawLightsResponse) => void;
  setGroups?: (obj: RawGroupsResponse) => void;
  setSensors?: (obj: any) => void;
  setScenes?: (obj: any) => void;
}
export const useDefaultHueState = () => {
  const [baseUrl, setBaseUrl] = React.useState<string | false>(
    localStorage.getItem("baseUrl") || false
  );
  const [username, setUsername] = React.useState<string | false>(
    localStorage.getItem("username") || false
  );
  const [lights, setLights] = React.useState<RawLightsResponse>({});
  const [groups, setGroups] = React.useState<RawGroupsResponse>({});
  const [sensors, setSensors] = React.useState<any>({});
  const [scenes, setScenes] = React.useState<any>({});
  return {
    baseUrl,
    setBaseUrl,
    username,
    setUsername,
    lights,
    setLights,
    groups,
    setGroups,
    sensors,
    setSensors,
    scenes,
    setScenes,
  };
};
export interface IHueContext {
  state: IHueState;
  refresh: () => void;
  disconnect: () => void;
  initialize: (ip: string, username: string) => void;
}

const _refresh = (state: IHueState, baseUrl: string) => {
  state.setLights && fetchLights(baseUrl, state.setLights);
  state.setScenes && fetchScenes(baseUrl, state.setScenes);
  state.setGroups && fetchGroups(baseUrl, state.setGroups);
  state.setSensors && fetchSensors(baseUrl, state.setSensors);
};
export const disconnect = (state: IHueState) => {
  localStorage.clear();
  state.setBaseUrl && state.setBaseUrl("");
  state.setUsername && state.setUsername("");
  state.setLights && state.setLights({});
  state.setScenes && state.setScenes({});
  state.setGroups && state.setGroups({});
  state.setSensors && state.setSensors({});
};
export const refresh = (state: IHueState) => {
  if (state && state.baseUrl) {
    _refresh(state, state.baseUrl || "");
  }
};
export const initialize = (state: IHueState, ip: string, username: string) => {
  const baseUrl = createBaseUrl(ip, username);
  state.setBaseUrl && state.setBaseUrl(baseUrl);
  state.setUsername && state.setUsername(username);
  localStorage.setItem("baseUrl", baseUrl);
  _refresh(state, baseUrl);
};
export const HueContext = React.createContext<IHueContext>({
  state: {
    baseUrl: false,
    username: false,
    lights: {},
    groups: {},
    sensors: {},
    scenes: {},
  },
  refresh: () => {},
  initialize: () => {},
  disconnect: () => {},
});
export const useHueContext = () => React.useContext(HueContext);
