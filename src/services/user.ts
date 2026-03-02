import type { UserInfo } from './user.type'
import http from '@/api/http'

export const getUserInfo = () => {
  return http.get<UserInfo>('/api/user', {
    mock: true
  })
}
