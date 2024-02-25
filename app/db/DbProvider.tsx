import { useRepo } from "@automerge/automerge-repo-react-hooks"
import { useRootDocument } from "hooks/useRootDocument"
import { DoneData } from "types"
import { db } from "./db"

export type DoneLookup = Record<DocumentId, DoneData>

export const DbContext = createContext(db)

export const DbProvider = ({ children }: Props) => {
  const repo = useRepo()
  // `state` is our shared state. `state.dones` is a list of ids
  const [state] = useRootDocument()

  const repoIds = new Set(state?.dones ?? [])

  // any time the state changes (i.e. we have new ids) we update the list of loaded dones
  useEffect(() => {
    if (state === undefined) return

    const syncDbWithRepo = async () => {
      const dbIds = new Set((await db.dones.toCollection().primaryKeys()) as AutomergeUrl[])

      // add new dones to the db
      const newUrls = Array.from(repoIds).filter(id => !dbIds.has(id))
      const newDones = await Promise.all(newUrls.map(async id => repo.find<DoneData>(id).doc()))
      await db.dones.bulkAdd(newDones as DoneData[])

      // remove deleted dones from the db
      const removedIds = Array.from(dbIds).filter(id => !repoIds.has(id))
      await db.dones.bulkDelete(removedIds)
    }

    syncDbWithRepo() //
      .catch(console.error)
  }, [state])

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>
}

type Props = {
  children: React.ReactNode
}
