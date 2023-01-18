export interface GroupsResponseObj {
  class: string;
  lights: string[];
  name: string;
  sensors: any[];
  type: string;
  state: any;
}

export type GroupsResponse = {
  [name: number]: GroupsResponseObj;
};
