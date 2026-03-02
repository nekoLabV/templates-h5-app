import { InterceptorManager } from './interceptor'
import type {
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor
} from './types'
import { mockManager } from './mock'

class HttpClient {
  requestInterceptors = new InterceptorManager<RequestInterceptor>()
  responseInterceptors = new InterceptorManager<ResponseInterceptor>()
  errorInterceptors = new InterceptorManager<ErrorInterceptor>()

  async request<T = any>(config: RequestConfig): Promise<T> {
    // mock 请求
    if (config.mock) {
      const handler = mockManager.get(config.url)
  
      if (!handler) {
        throw new Error(`Mock not found: ${config.url}`)
      }
  
      let data = await handler(config)
  
      // 响应拦截
      for (const interceptor of this.responseInterceptors.getHandlers()) {
        data = await interceptor(data)
      }
  
      return data
    }

    try {
      // 请求拦截
      for (const interceptor of this.requestInterceptors.getHandlers()) {
        config = await interceptor(config)
      }

      // 超时控制
      const controller = new AbortController()
      const timeout = config.timeout || 10000

      const timer = setTimeout(() => {
        controller.abort()
      }, timeout)

      const response = await fetch(config.url, {
        ...config,
        signal: controller.signal
      })

      clearTimeout(timer)

      // 状态码统一处理
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }

      let data = await response.json()

      // 响应拦截
      for (const interceptor of this.responseInterceptors.getHandlers()) {
        data = await interceptor(data)
      }

      return data

    } catch (error) {
      // 错误拦截
      for (const interceptor of this.errorInterceptors.getHandlers()) {
        error = await interceptor(error)
      }

      return Promise.reject(error)
    }
  }

  get<T>(url: string, config?: RequestConfig) {
    return this.request<T>({
      ...config,
      url,
      method: 'GET'
    })
  }

  post<T>(url: string, body?: any, config?: RequestConfig) {
    return this.request<T>({
      ...config,
      url,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...(config?.headers || {})
      }
    })
  }
}

export const http = new HttpClient()
