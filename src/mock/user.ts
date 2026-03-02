import { mockManager } from '@/api/mock'

mockManager.register('/api/user', async () => {
  return {
    status: 200,
    data: {
      id: 1,
      name: '未开发接口的 mock 数据'
    },
    msg: 'ok'
  }
})
