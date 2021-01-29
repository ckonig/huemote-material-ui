import { RawGroupsResponse, RawLightsResponse } from "./Common";
import { fetchGroups, fetchLights, fetchScenes, fetchSensors } from "./API";

import React from "react";

export interface IHueState {
  baseUrl: string | false;
  lights: RawLightsResponse;
  groups: RawGroupsResponse;
  sensors: any;
  scenes: any;
  setBaseUrl?: (ip: string) => void;
  setLights?: (obj: RawLightsResponse) => void;
  setGroups?: (obj: RawGroupsResponse) => void;
  setSensors?: (obj: any) => void;
  setScenes?: (obj: any) => void;
}
export const useDefaultHueState = () => {
  const [baseUrl, setBaseUrl] = React.useState<string | false>(false);
  const [lights, setLights] = React.useState<RawLightsResponse>({});
  const [groups, setGroups] = React.useState<RawGroupsResponse>({});
  const [sensors, setSensors] = React.useState<any>({});
  const [scenes, setScenes] = React.useState<any>({});
  return {
    baseUrl,
    setBaseUrl,
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
  initialize: (baseUrl: string) => void;
}

const _refresh = (state: IHueState, baseUrl: string) => {
  state.setLights && fetchLights(baseUrl, state.setLights);
  state.setScenes && fetchScenes(baseUrl, state.setScenes);
  state.setGroups && fetchGroups(baseUrl, state.setGroups);
  state.setSensors && fetchSensors(baseUrl, state.setSensors);
};
export const refresh = (state: IHueState) => {
  if (state && state.baseUrl) {
    _refresh(state, state.baseUrl || "");
  }
};
export const initialize = (state: IHueState, baseUrl: string) => {
  state.setBaseUrl && state.setBaseUrl(baseUrl);
  _refresh(state, baseUrl);
};
export const HueContext = React.createContext<IHueContext>({
  state: {
    baseUrl: false,
    lights: {},
    groups: {},
    sensors: {},
    scenes: {},
  },
  refresh: () => {},
  initialize: () => {},
});
export const useHueContext = () => React.useContext(HueContext);
