import { useMemo } from "react";
import { GroupsResponseObj } from "../clip/v1/groups";
import { LightsReponseObj } from "../clip/v1/lights";
import { SceneObject } from "../clip/v1/scenes";
import useGroups from "../queries/groups";
import useLights from "../queries/lights";
import useScenes from "../queries/scenes";

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

export const useRooms = () => {
  const { groups } = useGroups();
  const { lights } = useLights();
  const { scenes } = useScenes();
  return useMemo<Room[]>(
    () =>
      Object.keys(groups)
        .map((k) => parseInt(k))
        .map((id: number) => ({
          //map regular group properties to room, preserving id inside the new object
          ...groups[id],
          id,
          //map lights by replacing ID array with objects, preserving ID inside the object
          lights: groups[id].lights.map((l) => ({
            ...lights[parseInt(l)],
            id: parseInt(l),
          })),
          //find scenes with matching group id, preserving ID inside the object
          scenes: Object.keys(scenes)
            .filter(
              (s) =>
                !scenes[s].recycle &&
                scenes[s].type === "GroupScene" &&
                parseInt(scenes[s].group) === id
            )
            .map((s) => ({ ...scenes[s], id: s })),
        })),
    [groups, lights, scenes]
  );
};
