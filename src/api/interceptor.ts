export class InterceptorManager<T> {
  private handlers: T[] = []

  use(handler: T) {
    this.handlers.push(handler)
  }

  getHandlers() {
    return this.handlers
  }
}
