import { useQuery } from "react-query";
import { Config } from "../clip/v1/config";
import useQueryCache from "./useQueryCache";
import useApi from "../clip/v1/api";

const useConfig = () => {
  const api = useApi();
  const cache = useQueryCache();
  return useQuery<Config, any>(cache.keys.config, {
    queryFn: () => api.getConfig(),
    initialData: {} as Config,
  });
};
export default useConfig;
