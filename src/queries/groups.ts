import { useHueContext } from "../HueContext";
import { useQuery } from "react-query";
import { GroupsResponse } from "../clip/v1/groups";
import { useCallback, useMemo } from "react";

const useGroups = () => {
  const {
    state: { baseUrl },
  } = useHueContext();
  const initialData = useMemo(() => ({} as GroupsResponse), []);
  const query = useQuery<GroupsResponse, any>(`${baseUrl}/groups`, {
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/groups`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialData,
  });

  const toggle = useCallback(
    (elem: any) => {
      const payload = { on: !elem.state.any_on };
      // @todo move to api
      fetch(`${baseUrl}/groups/${elem.key}/action`, {
        method: "put",
        body: JSON.stringify(payload),
      });
    },
    [baseUrl]
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
