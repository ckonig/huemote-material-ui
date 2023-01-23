export interface LightsReponseObj {
  capabilities: any;
  config: any;
  manufacturername: string;
  modelid: string;
  name: string;
  productid: string;
  productname: string;
  state: LightState;
  type: string;
}

export interface LightState {
  bri: number;
  on: boolean;
}

export type RawLightsResponse = { [name: number]: LightsReponseObj };
