type MockHandler = (config: any) => any | Promise<any>

class MockManager {
  private mocks = new Map<string, MockHandler>()

  register(url: string, handler: MockHandler) {
    this.mocks.set(url, handler)
  }

  get(url: string) {
    return this.mocks.get(url)
  }
}

export const mockManager = new MockManager()
