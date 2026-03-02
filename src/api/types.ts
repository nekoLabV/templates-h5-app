export interface RequestConfig extends RequestInit {
  url: string
  timeout?: number
  auth?: boolean
}

export type RequestInterceptor = (
  config: RequestConfig
) => Promise<RequestConfig> | RequestConfig

export type ResponseInterceptor<T = any> = (
  response: T
) => Promise<T> | T

export type ErrorInterceptor = (error: any) => any
