import { useQuery } from "react-query";
import { GroupsResponse } from "../clip/v1/groups";
import { useCallback, useMemo } from "react";
import { Room } from "../domain/models";
import useQueryCache from "./useQueryCache";
import useApi from "../clip/v1/api";

const useGroups = () => {
  const cache = useQueryCache();
  const api = useApi();
  const initialData = useMemo(() => ({} as GroupsResponse), []);
  const query = useQuery<GroupsResponse, any>(cache.keys.groups, {
    cacheTime: 10,
    queryFn: () => api.getGroups(),
    initialData,
  });

  const refreshGroups = useCallback(async () => {
    await cache.clear.groups();
    await cache.clear.lights();
  }, [cache]);

  const toggle = useCallback(
    async (elem: Room) => {
      await api.putGroupAction(elem.id, { on: !elem.state.any_on });
      refreshGroups();
    },
    [api, refreshGroups]
  );

  const shutDown = useCallback(async () => {
    await api.putGroupAction(0, { on: false });
    refreshGroups();
  }, [api, refreshGroups]);

  return useMemo(
    () => ({
      groups: query.data || initialData,
      toggle,
      shutDown,
    }),
    [initialData, query, toggle, shutDown]
  );
};
export default useGroups;
