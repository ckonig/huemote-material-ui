import { useMemo } from "react";
import useConnection from "../../queries/useConnection";

const myFetch = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const putJson = (url: string, body: any) =>
  fetch(url, {
    method: "put",
    body: JSON.stringify(body),
  });

const useApi = () => {
  const { baseUrl } = useConnection();
  return useMemo(
    () => ({
      getScenes: () => myFetch(`${baseUrl}/scenes`),
      getSensors: () => myFetch(`${baseUrl}/sensors`),
      getLights: () => myFetch(`${baseUrl}/lights`),
      putLightState: (id: number, state: any) =>
        putJson(`${baseUrl}/lights/${id}/state`, state),
      getConfig: () => myFetch(`${baseUrl}/config`),
      getGroups: () => myFetch(`${baseUrl}/groups`),
      putGroupAction: (id: number, action: any) =>
        putJson(`${baseUrl}/groups/${id}/action`, action),
      //@todo this guy is different
      connect: (ip: string, uid: string) =>
        fetch(`http://${ip}/api`, {
          method: "post",
          body: JSON.stringify({ devicetype: "hue-react#" + uid }),
        }).then((d) => d.json()),
    }),
    [baseUrl]
  );
};

export default useApi;
