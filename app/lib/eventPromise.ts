export const eventPromise = async (emitter: EventEmitter, event: string) =>
  new Promise<any>(resolve => {
    emitter.once(event, (d: any) => resolve(d))
  })

// stub this out rather than importing the package
type EventEmitter = {
  once(event: string, listener: (...args: any[]) => void): EventEmitter
}
