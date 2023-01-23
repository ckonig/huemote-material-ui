import { useHueContext } from "../HueContext";
import { useQuery, useQueryClient } from "react-query";
import { GroupsResponse } from "../clip/v1/groups";
import { useCallback, useMemo } from "react";
import { Room } from "../domain/room";

const useGroups = () => {
  const queryClient = useQueryClient();
  const {
    state: { baseUrl },
  } = useHueContext();
  const initialData = useMemo(() => ({} as GroupsResponse), []);
  const query = useQuery<GroupsResponse, any>(`${baseUrl}/groups`, {
    cacheTime: 10,
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/groups`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialData,
  });

  const refreshGroups = useCallback(
    () => queryClient.refetchQueries({ queryKey: `${baseUrl}/groups` }),
    [baseUrl, queryClient]
  );

  const toggle = useCallback(
    async (elem: Room) => {
      const payload = { on: !elem.state.any_on };
      await fetch(`${baseUrl}/groups/${elem.id}/action`, {
        method: "put",
        body: JSON.stringify(payload),
      });
      refreshGroups();
    },
    [baseUrl, refreshGroups]
  );

  return useMemo(
    () => ({
      groups: query.data || initialData,
      toggle,
    }),
    [initialData, query, toggle]
  );
};
export default useGroups;
