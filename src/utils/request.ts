import { CONFIG } from '@/config/request'

// 请求拦截器
const requestInterceptor = (options) => {
  // 合并请求配置
  options.timeout = options.timeout || CONFIG.timeout;
  options.headers = { ...CONFIG.header, ...options.headers };

  return options;
};

// 响应拦截器
const responseInterceptor = (response) => {
  if (response.code === 200) {
    return response.data;
  }

  // 处理错误响应
  const error = new Error(response.message || '请求失败');
  error.response = response;
  // throw error;
  return response;
};

// 错误处理
const handleError = (error) => {

  console.error('请求错误:', error.message);

  if (error.response) {
    console.error('响应数据:', error.response);

    // 显示错误信息
    /* let errorMessage = parseErrorMessage(error.response);
    if (errorMessage) {
      try {
        if (errorBoxRef && errorBoxRef.value) {
          errorBoxRef.value.show(errorMessage);
        }
      } catch (e) {
        console.error('无法显示错误信息:', e);
      }
    } */
  }
  return Promise.reject(error);
};

// 解析错误消息
const parseErrorMessage = (error) => {
  if (typeof error.message === 'object' && error.message !== null) {
    try {
      return JSON.stringify(error.message);
    } catch (e) {
      console.error('无法解析错误消息:', e);
      return error.message;
    }
  }
  return error.message;
};

function request({ url, method = 'GET', data = null, options }) {
  if (!url) {
    throw new Error('URL is required');
  }
  url = url.startsWith('/') ? url.slice(1) : url;

  // 构造请求选项
  const requestOptions = {
    method,
    headers: CONFIG.headers,
    body: data ? JSON.stringify(data) : null,
    ...options,
  };

  // 拦截器处理
  const interceptedOptions = requestInterceptor(requestOptions);

  return fetch(CONFIG.baseUrl + url, interceptedOptions)
    .then(async (response) => {
      if (!response.ok) {
        let error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        const res = await response.json();
        error.response = res;
        throw error;
        // handleError(error)
        // return res
      }
      return response.json();
    })
    .then(responseInterceptor)
    .catch(handleError);
}

export const http = {
  get: (url: string, data, options = {}) => {
    return request({
      url,
      data,
      method: 'GET',
      options,
    });
  },
  post: (url: string, data, options = {}) => {
    return request({
      url,
      data,
      method: 'POST',
      options,
    });
  },
  put: (url: string, data, options = {}) => {
    return request({
      url,
      data,
      method: 'PUT',
      options,
    });
  },
};
