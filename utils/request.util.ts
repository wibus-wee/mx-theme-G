import { message } from "react-message-popup";
import { axiosAdaptor } from '@mx-space/api-client/dist/adaptors/axios'
import { isDev, isServerSide } from "./env.util";
import { createClient, allControllers } from "@mx-space/api-client";
import PKG from '../package.json'
import { IncomingMessage } from "http";
import { version } from "react";
import { getToken, TokenStorageKey } from "./token.util";
import { AxiosError, CanceledError } from "axios";

const genUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://192.168.3.4:2333'
export const apiClient = createClient(axiosAdaptor)(endpoint)

const $axios = axiosAdaptor.default
$axios.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (config.headers) {
      token && (config.headers['Authorization'] = token)
      config.headers['x-uuid'] = genUUID()
    }

    return config
  },
  (error: AxiosError<Record<string, any> | undefined>) => {
    if (error instanceof CanceledError) {
      return Promise.reject(error)
    }

    if (isDev()) {
      console.error(error.message)
    }

  },
)

apiClient.injectControllers(allControllers)

export const attachRequestProxy = (request?: IncomingMessage) => {
  if (!request) {
    return
  }

  if (!isServerSide()) {
    return
  }

  let ip =
    ((request.headers['x-forwarded-for'] ||
      request.headers['X-Forwarded-For'] ||
      request.headers['X-Real-IP'] ||
      request.headers['x-real-ip'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress) as string) || undefined
  if (ip && ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  ip && ($axios.defaults.headers.common['x-forwarded-for'] = ip as string)

  $axios.defaults.headers.common[
    'User-Agent'
  ] = `${request.headers['user-agent']} NextJS/v${PKG.dependencies.next} G/${version}`

  // forward auth token
  const cookie = request.headers.cookie
  if (cookie) {
    const token = cookie
      .split(';')
      .find((str) => {
        const [key] = str.split('=')

        return key === TokenStorageKey
      })
      ?.split('=')[1]
    if (token) {
      $axios.defaults.headers['Authorization'] = `bearer ${token.replace(
        /^Bearer\s/i,
        '',
      )}`
    }
  }
}
