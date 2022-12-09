import { message } from "react-message-popup";
import { axiosAdaptor } from '@mx-space/api-client/dist/adaptors/axios'
import { isDev } from "./env.util";
import { createClient, allControllers } from "@mx-space/api-client";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://192.168.3.4:2333'
const client = createClient(axiosAdaptor)(endpoint)

const $axios = axiosAdaptor.default
$axios.interceptors.request.use(
  // (config) => {},
  (error) => {
    isDev() && message.error(error.data?.message);
    return Promise.reject(error);
  },
)

client.injectControllers(allControllers)

export const apiClient = client