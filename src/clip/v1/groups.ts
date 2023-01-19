export interface GroupsResponseObj<T, F> {
  class: string;
  lights: T[];
  name: string;
  sensors: F[];
  type: string;
  state: any;
}

export type GroupsResponse = {
  [name: number]: GroupsResponseObj<string, any>;
};
