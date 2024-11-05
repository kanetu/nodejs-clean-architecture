import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { replaceWithEnv } from "../utils/replaceWithEnv";
import "dotenv/config";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers.Authorization = replaceWithEnv(
    "ADOBE_ACROBAT_SIGN_AUTHORISE_TOKEN"
  );
  config.headers["Content-Type"] = "application/json";
  config.headers["Accept"] = "application/pdf;encoding=base64"
  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // Backbones:
  //- Handle response data
  //- Error handling when there is extra logic, for example: return success with error code
  return response;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { status } = error.response as AxiosResponse;

    switch (status) {
      case 401: {
        // Login require
        break;
      }

      case 403: {
        // Permission denied
        break;
      }
      case 404: {
        // Invalid request
        break;
      }
      case 500: {
        // Server error
        break;
      }
      default: {
        // Unknown error occured
        break;
      }
    }
  }

  return Promise.reject(error);
};

const setupAxiosInstance = (baseUrl: string) => {
  const instance = axios.create();

  instance.defaults.baseURL = baseUrl;
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);

  return instance;
};

const adobeAcrobatSignBaseURL = replaceWithEnv("ADOBE_ACROBAT_SIGN_BASE_URL");

const adobeAcrobatSignInstance = setupAxiosInstance(adobeAcrobatSignBaseURL);

export default adobeAcrobatSignInstance;
