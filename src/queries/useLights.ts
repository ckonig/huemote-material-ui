import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import useApi from "../clip/v1/api";
import { RawLightsResponse } from "../clip/v1/lights";
import { Light } from "../domain/models";
import useQueryCache from "./useQueryCache";

const useLights = () => {
  const cache = useQueryCache();
  const api = useApi();
  const initialData = useMemo(() => ({} as RawLightsResponse), []);
  const query = useQuery<RawLightsResponse, any>(cache.keys.lights, {
    cacheTime: 10,
    queryFn: () => api.getLights(),
    initialData,
  });

  const refreshLights = useCallback(async () => {
    await cache.clear.lights();
    await cache.clear.groups();
  }, [cache]);

  const setBrightness = useCallback(
    async (key: number, newval: number) => {
      await api.putLightState(key, { bri: newval });
      refreshLights();
    },
    [api, refreshLights]
  );

  const toggle = useCallback(
    async (light: Light) => {
      await api.putLightState(light.id, {
        on: !light.state.on,
      });
      refreshLights();
    },
    [api, refreshLights]
  );

  return useMemo(
    () => ({
      lights: query.data || initialData,
      setBrightness,
      toggle,
    }),
    [query, initialData, setBrightness, toggle]
  );
};
export default useLights;
