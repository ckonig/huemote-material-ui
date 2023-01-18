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
