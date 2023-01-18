import { useHueContext } from "../HueContext";
import { useQuery } from "react-query";
import { GroupsResponse } from "../clip/v1/groups";
import { useMemo } from "react";

const useGroups = () => {
  const {
    state: { baseUrl },
  } = useHueContext();
  const initialData = {} as GroupsResponse;
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

  return useMemo(
    () => ({
      groups: query.data || initialData,
    }),
    [initialData, query]
  );
};
export default useGroups;
