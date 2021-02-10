export interface LightsReponseObj {
  capabilities: any;
  config: any;
  manufacturername: string;
  modelid: string;
  name: string;
  productid: string;
  productname: string;
  state: any;
  type: string;
}

export type RawLightsResponse = { [name: number]: LightsReponseObj };

export interface GroupsResponseObj {
  class: string;
  lights: string[];
  name: string;
  sensors: any[];
  type: string;
  state: any;
}

export type RawGroupsResponse = {
  [name: number]: GroupsResponseObj;
};

export interface State {
  daylight: boolean;
  lastupdated: any;
  flag?: boolean;
  presence?: boolean;
  buttonevent?: number;
  status?: number;
  temperature?: number;
  lightlevel?: number;
  dark?: boolean;
}

export interface Config {
  on: boolean;
  configured: boolean;
  sunriseoffset: number;
  sunsetoffset: number;
  reachable?: boolean;
  battery?: number;
  pending: any[];
  alert: string;
  ledindication?: boolean;
  usertest?: boolean;
  sensitivity?: number;
  sensitivitymax?: number;
  tholddark?: number;
  tholdoffset?: number;
}

export interface Swupdate {
  state: string;
  lastinstall?: Date;
}

export interface Event {
  buttonevent: number;
  eventtype: string;
}

export interface Input {
  repeatintervals: number[];
  events: Event[];
}

export interface Capabilities {
  certified: boolean;
  primary: boolean;
  inputs: Input[];
}

export interface SensorObject {
  key: string;
  state: State;
  config: Config;
  name: string;
  type: string;
  modelid: string;
  manufacturername: string;
  swversion: string;
  uniqueid: string;
  recycle?: boolean;
  swupdate: Swupdate;
  productname: string;
  diversityid: string;
  capabilities: Capabilities;
}

export interface SensorRootObject {
  [id: string]: SensorObject;
}
