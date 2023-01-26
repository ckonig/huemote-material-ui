import { useMemo } from "react";
import useConnection from "../../queries/useConnection";
import axios from "axios";

const pem = `-----BEGIN CERTIFICATE-----
MIICMjCCAdigAwIBAgIUO7FSLbaxikuXAljzVaurLXWmFw4wCgYIKoZIzj0EAwIw
OTELMAkGA1UEBhMCTkwxFDASBgNVBAoMC1BoaWxpcHMgSHVlMRQwEgYDVQQDDAty
b290LWJyaWRnZTAiGA8yMDE3MDEwMTAwMDAwMFoYDzIwMzgwMTE5MDMxNDA3WjA5
MQswCQYDVQQGEwJOTDEUMBIGA1UECgwLUGhpbGlwcyBIdWUxFDASBgNVBAMMC3Jv
b3QtYnJpZGdlMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEjNw2tx2AplOf9x86
aTdvEcL1FU65QDxziKvBpW9XXSIcibAeQiKxegpq8Exbr9v6LBnYbna2VcaK0G22
jOKkTqOBuTCBtjAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIBhjAdBgNV
HQ4EFgQUZ2ONTFrDT6o8ItRnKfqWKnHFGmQwdAYDVR0jBG0wa4AUZ2ONTFrDT6o8
ItRnKfqWKnHFGmShPaQ7MDkxCzAJBgNVBAYTAk5MMRQwEgYDVQQKDAtQaGlsaXBz
IEh1ZTEUMBIGA1UEAwwLcm9vdC1icmlkZ2WCFDuxUi22sYpLlwJY81Wrqy11phcO
MAoGCCqGSM49BAMCA0gAMEUCIEBYYEOsa07TH7E5MJnGw557lVkORgit2Rm1h3B2
sFgDAiEA1Fj/C3AN5psFMjo0//mrQebo0eKd3aWRx+pQY08mk48=
-----END CERTIFICATE-----`;

const getClient = () => {
  return axios.create({
    //baseURL: baseUrl,
    httpsAgent: { ca: pem },
  });
};

const myFetch = async (url: string) => {
  const client = getClient();
  const response = await client.get(url);
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
};

const putJson = (url: string, body: any) => {
  const client = getClient();
  client.put(url, body);
};

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
        fetch(`https://${ip}/api`, {
          method: "post",
          body: JSON.stringify({ devicetype: "hue-react#" + uid }),
        }).then((d) => d.json()),
    }),
    [baseUrl]
  );
};

export default useApi;
