import { useQuery } from "react-query";
import { useCallback, useMemo } from "react";
import { ScenesReponse } from "../clip/v1/scenes";
import { Scene } from "../domain/models";
import useQueryCache from "./useQueryCache";
import useApi from "../clip/v1/api";

const useScenes = () => {
  const cache = useQueryCache();
  const api = useApi();
  const initialData = useMemo(() => ({} as ScenesReponse), []);
  const query = useQuery<ScenesReponse, any>(cache.keys.scenes, {
    queryFn: () => api.getScenes(),
    initialData,
  });

  const activate = useCallback(
    async (scene: Scene) => {
      await api.putGroupAction(parseInt(scene.group), { scene: scene.id });
      await cache.clear.groups();
      await cache.clear.lights();
    },
    [api, cache]
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
