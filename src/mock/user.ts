import { mockManager } from '@/api/mock'

mockManager.register('/user', async () => {
  return {
    status: 200,
    data: {
      id: 1,
      name: 'mock 用户1'
    },
    msg: 'ok'
  }
})
