import { useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { RawLightsResponse } from "../clip/v1/lights";
import { useHueContext } from "../HueContext";

const useLights = () => {
  const {
    state: { baseUrl },
  } = useHueContext();
  const queryClient = useQueryClient();
  const initialData = {} as RawLightsResponse;
  const query = useQuery<RawLightsResponse, any>(`${baseUrl}/lights`, {
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/lights`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialData,
  });

  const refreshLights = () =>
    queryClient.invalidateQueries({ queryKey: `${baseUrl}/lights` });

  const setBrightness = async (key: string, newval: number) => {
    await fetch(`${baseUrl}/lights/${key}/state`, {
      method: "put",
      body: JSON.stringify({ bri: newval }),
    });
    refreshLights();
  };

  const toggle = async (light: any) => {
    await fetch(`${baseUrl}/lights/${light.key}/state`, {
      method: "put",
      body: JSON.stringify({ on: !light.state.on }),
    });
    refreshLights();
  };

  const shutDown = async () => {
    await fetch(`${baseUrl}/groups/0/action`, {
      method: "put",
      body: JSON.stringify({ on: false }),
    });
    refreshLights();
  };

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
