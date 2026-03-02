import { http } from './fetch'

http.requestInterceptors.use(async (config) => {
  const token = localStorage.getItem('token')

  if (token && !config.auth) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }

  return config
})

http.responseInterceptors.use((data) => {
  if (data.status !== 200) {
    throw new Error(data.msg)
  }
  return data.data
})

http.errorInterceptors.use((error) => {
  if (error.name === 'AbortError') {
    console.error('请求超时')
  }

  if (error.message.includes('401')) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return error
})

export default http
