import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket"
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { server, wsUrl } from "./getSyncServer.client"
import { eventPromise } from "./eventPromise"

/**
 * Creates an auth provider and a repo with a shared storage adapter and a websocket adapter.
 * Returns when the auth provider has loaded persisted state, and the repo has a working network connection.
 */
export const initializeAuthRepo = async ({ user, device }: Params) => {
  // We'll use the same storage adapter for the auth provider and the repo
  const storage = new IndexedDBStorageAdapter()
  const auth = new AuthProvider({ user, device, storage, server })

  const adapter = new BrowserWebSocketClientAdapter(wsUrl)
  const authAdapter = auth.wrap(adapter)

  // Create new repo with websocket adapter
  const repo = new Repo({
    peerId: device.deviceId as PeerId,
    network: [authAdapter],
    storage,
  })

  await Promise.all([
    eventPromise(auth, "ready"), // auth provider has loaded any persisted state
    eventPromise(repo.networkSubsystem, "ready"), // repo has a working network connection
  ])

  return { auth, repo }
}

type Params = {
  user?: UserWithSecrets
  device: DeviceWithSecrets
}
