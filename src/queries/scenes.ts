import { useQuery, useQueryClient } from "react-query";
import { useCallback, useMemo } from "react";
import { ScenesReponse } from "../clip/v1/scenes";
import { Scene } from "../domain/room";
import { useConnection } from "./setup";

const useScenes = () => {
  const queryClient = useQueryClient();
  const { baseUrl } = useConnection();
  const initialData = useMemo(() => ({} as ScenesReponse), []);
  const query = useQuery<ScenesReponse, any>(`${baseUrl}/scenes`, {
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/scenes`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialData,
  });

  const activate = useCallback(
    async (scene: Scene) => {
      const payload = { scene: scene.id };
      await fetch(`${baseUrl}/groups/${scene.group}/action`, {
        method: "put",
        body: JSON.stringify(payload),
      });
      queryClient.refetchQueries();
    },
    [baseUrl, queryClient]
  );

  return useMemo(
    () => ({
      scenes: query.data || initialData,
      activate,
    }),
    [initialData, query, activate]
  );
};
export default useScenes;
