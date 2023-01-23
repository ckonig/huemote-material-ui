import { GroupsResponseObj } from "../clip/v1/groups";
import { LightsReponseObj } from "../clip/v1/lights";
import { SceneObject } from "../clip/v1/scenes";
import { SensorObject } from "../clip/v1/sensors";

export interface Room extends GroupsResponseObj<Light, Scene> {
  id: number;
  scenes: Scene[];
  lights: Light[];
}

export interface Scene extends SceneObject {
  id: string;
}

export interface Light extends LightsReponseObj {
  id: number;
}

export interface Sensor {
  name: string;
  deviceid: string;
  lightLevel: SensorObject;
  temperature: SensorObject;
  presence: SensorObject;
}

export interface Switch {
  deviceid: string;
  switch: SensorObject;
}
