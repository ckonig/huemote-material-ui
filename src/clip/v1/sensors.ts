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

export const SENSOR_TYPES = {
  Daylight: "Daylight",
  LightLevel: "ZLLLightLevel",
  Temperature: "ZLLTemperature",
  Presence: "ZLLPresence",
  Generic: "CLIPGenericStatus",
  TapSwitch: "ZGPSwitch",
  DimmerSwitch: "ZLLSwitch",
};

//keep the enum
//sensors must be merged into devices
//invent the device model with its specific incarnations
//Motion Detector with Presence Sensor and Temperature Sensor
//Dimmer Switch and Tap Switch
//keep the interface expandable

export interface SensorRootObject {
  [id: string]: SensorObject;
}

export interface Capabilities {
  certified: boolean;
  primary: boolean;
  inputs: Input[];
}

export interface Input {
  repeatintervals: number[];
  events: Event[];
}

export interface Swupdate {
  state: string;
  lastinstall?: Date;
}

export interface Event {
  buttonevent: number;
  eventtype: string;
}

export interface Config {
  on: boolean;
  configured: boolean;
  battery?: number;
  pending: any[];
  reachable?: boolean;
  usertest?: boolean;
  sunriseoffset: number;
  sunsetoffset: number;
  sensitivity?: number;
  sensitivitymax?: number;
  alert: string;
  ledindication?: boolean;
  tholddark?: number;
  tholdoffset?: number;
}

export interface State {
  lastupdated: any;
  flag?: boolean;
  status?: number;
  dark?: boolean;
  presence: boolean;
  temperature: number;
  daylight: boolean;
  lightlevel: number;
  buttonevent: number;
}
