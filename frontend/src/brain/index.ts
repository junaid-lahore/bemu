import { auth } from "app/auth";
import { API_HOST, API_PATH, API_PREFIX_PATH, API_URL } from "../constants";
import { Brain } from "./Brain";
import type { RequestParams } from "./http-client";

const isDeployedToCustomApiPath = API_PREFIX_PATH !== API_PATH;

const constructBaseUrl = (): string => {
  if (API_URL) {
    return API_URL;
  }
  if (isDeployedToCustomApiPath) {
    const domain = typeof window !== "undefined" ? window.location.origin : `http://${API_HOST}`;
    return `${domain}${API_PREFIX_PATH}`;
  }
  return `http://${API_HOST}${API_PATH}`;
};

type BaseApiParams = Omit<RequestParams, "signal" | "baseUrl" | "cancelToken">;

const constructBaseApiParams = (): BaseApiParams => {
  return {
    credentials: "include",
    secure: true,
  };
};

const constructClient = () => {
  const baseUrl = constructBaseUrl();
  const baseApiParams = constructBaseApiParams();

  return new Brain({
    baseUrl,
    baseApiParams,
    customFetch: (url, options) => {
      if (isDeployedToCustomApiPath && typeof url === "string") {
        // Remove /routes/ segment from path if the api is deployed and made accessible through
        // another domain with custom path different from the databutton proxy path
        return fetch(url.replace(API_PREFIX_PATH + "/routes", API_PREFIX_PATH), options);
      }

      return fetch(url, options);
    },
    securityWorker: async () => {
      return {
        headers: {
          Authorization: await auth.getAuthHeaderValue(),
        },
      };
    },
  });
};

const brain = constructClient();

export default brain;
