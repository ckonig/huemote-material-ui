export interface ScenesReponse {
  [name: string]: SceneObject;
}
export interface SceneObject {
  type: string;
  group: string;
  image: string;
  lights: number[];
  name: string;
  owner: string;
  version: number;
  lastupdated: Date;
  locked: boolean;
  recycle: boolean;
}
