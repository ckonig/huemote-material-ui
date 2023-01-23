import { useMemo } from "react";
import useGroups from "../queries/useGroups";
import useLights from "../queries/useLights";
import useScenes from "../queries/useScenes";
import { Room } from "./models";

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
