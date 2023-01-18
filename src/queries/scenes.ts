import { useHueContext } from "../HueContext";
import { useQuery, useQueryClient } from "react-query";
import { useCallback, useMemo } from "react";

const useScenes = () => {
  const queryClient = useQueryClient();
  const {
    state: { baseUrl },
  } = useHueContext();
  const initialData = {} as any;
  const query = useQuery<any, any>(`${baseUrl}/scenes`, {
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
    async (scene: any, id: string) => {
      const payload = { scene: scene.key };
      await fetch(`${baseUrl}/groups/${id}/action`, {
        method: "put",
        body: JSON.stringify(payload),
      });
      queryClient.invalidateQueries({ queryKey: `${baseUrl}/scenes` });
      //@todo update lights and rooms?
    },
    [baseUrl]
  );

  return useMemo(
    () => ({
      scenes: query.data || initialData,
      activate,
    }),
    [initialData, query]
  );
};
export default useScenes;
