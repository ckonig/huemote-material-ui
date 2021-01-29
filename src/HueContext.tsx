import { RawGroupsResponse, RawLightsResponse } from "./Common";
import { fetchGroups, fetchLights, fetchScenes, fetchSensors } from "./API";

import React from "react";

export interface IHueState {
  ip: string | false;
  lights: RawLightsResponse;
  groups: RawGroupsResponse;
  sensors: any;
  scenes: any;
  setIp?: (ip: string) => void;
  setLights?: (obj: RawLightsResponse) => void;
  setGroups?: (obj: RawGroupsResponse) => void;
  setSensors?: (obj: any) => void;
  setScenes?: (obj: any) => void;
}
export const useDefaultHueState = () => {
  const [ip, setIp] = React.useState<string | false>(false);
  const [lights, setLights] = React.useState<RawLightsResponse>({});
  const [groups, setGroups] = React.useState<RawGroupsResponse>({});
  const [sensors, setSensors] = React.useState<any>({});
  const [scenes, setScenes] = React.useState<any>({});
  return {
    ip,
    setIp,
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
}
export const refresh = (state: IHueState) => {
  state.setLights && fetchLights(state.setLights);
  state.setScenes && fetchScenes(state.setScenes);
  state.setGroups && fetchGroups(state.setGroups);
  state.setSensors && fetchSensors(state.setSensors);
};
export const HueContext = React.createContext<IHueContext>({
  state: {
    ip: false,
    lights: {},
    groups: {},
    sensors: {},
    scenes: {},
  },
  refresh: () => {},
});
export const useHueContext = () => React.useContext(HueContext);
