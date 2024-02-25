import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket"
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { url } from "./getSyncServer"
import { eventPromise } from "../lib/eventPromise"

export async function createRepoWithAuth(user: UserWithSecrets, device: DeviceWithSecrets) {
  const storage = new IndexedDBStorageAdapter()
  const auth = new AuthProvider({ user, device, storage })

  const adapter = new BrowserWebSocketClientAdapter(url)
  const authAdapter = auth.wrap(adapter)

  // Create new automerge-repo with websocket adapter
  const repo = new Repo({
    peerId: device.deviceId as PeerId,
    network: [authAdapter],
    storage,
  })

  await Promise.all([
    eventPromise(authAdapter, "ready"),
    eventPromise(auth, "ready"),
    eventPromise(repo.networkSubsystem, "ready"),
  ])

  return { auth, repo }
}
