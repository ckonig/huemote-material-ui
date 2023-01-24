import { useMemo } from "react";
import { useQueryClient } from "react-query";
import useConnection from "./useConnection";

const useQueryCache = () => {
  const queryClient = useQueryClient();
  const { baseUrl } = useConnection();
  const keys = useMemo(
    () => ({
      groups: `${baseUrl}/groups`,
      lights: `${baseUrl}/lights`,
      scenes: `${baseUrl}/scenes`,
      sensors: `${baseUrl}/sensors`,
      config: `${baseUrl}/config`,
    }),
    [baseUrl]
  );
  return useMemo(
    () => ({
      keys,
      clear: {
        groups: () => queryClient.refetchQueries(keys.groups),
        lights: () => queryClient.refetchQueries(keys.lights),
        scenes: () => queryClient.refetchQueries(keys.scenes),
        sensors: () => queryClient.refetchQueries(keys.sensors),
        config: () => queryClient.refetchQueries(keys.config),
      },
    }),
    [keys, queryClient]
  );
};

export default useQueryCache;
