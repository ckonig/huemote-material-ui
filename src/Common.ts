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
