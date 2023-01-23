import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { RawLightsResponse } from "../clip/v1/lights";
import { Light } from "../domain/room";
import { useConnection } from "./setup";

const useLights = () => {
  const { baseUrl } = useConnection();
  const queryClient = useQueryClient();
  const initialData = useMemo(() => ({} as RawLightsResponse), []);
  const query = useQuery<RawLightsResponse, any>(`${baseUrl}/lights`, {
    cacheTime: 10,
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/lights`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialData,
  });

  const refreshLights = useCallback(
    () => queryClient.refetchQueries({ queryKey: `${baseUrl}/lights` }),
    [baseUrl, queryClient]
  );

  const putJson = useCallback(
    (url: string, body: any) =>
      fetch(url, {
        method: "put",
        body: JSON.stringify(body),
      }),
    []
  );

  const setBrightness = useCallback(
    async (key: number, newval: number) => {
      await putJson(`${baseUrl}/lights/${key}/state`, { bri: newval });
      refreshLights();
    },
    [baseUrl, refreshLights, putJson]
  );

  const toggle = useCallback(
    async (light: Light) => {
      await putJson(`${baseUrl}/lights/${light.id}/state`, {
        on: !light.state.on,
      });
      refreshLights();
    },
    [baseUrl, refreshLights, putJson]
  );

  const shutDown = useCallback(async () => {
    await putJson(`${baseUrl}/groups/0/action`, { on: false });
    refreshLights();
  }, [baseUrl, refreshLights, putJson]);

  return useMemo(
    () => ({
      lights: query.data || initialData,
      setBrightness,
      toggle,
      shutDown,
    }),
    [query, initialData, setBrightness, toggle, shutDown]
  );
};
export default useLights;
