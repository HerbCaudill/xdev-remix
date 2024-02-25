import { useRepo } from "@automerge/automerge-repo-react-hooks"
import type { LocalDate } from "@js-joda/core"
import { useTeam } from "auth/useTeam"
import { DoneData, ExtendedArray, PartialDoneData, SharedState, Timestamp } from "types"
import { useRootDocument } from "hooks/useRootDocument"
import { useDb } from "./useDb"

export function useDones() {
  const repo = useRepo()
  const db = useDb()
  const { user } = useTeam()
  const { userId } = user

  // `state` is our shared state. `state.dones` is a list of ids
  const [, changeState] = useRootDocument()

  // READ
  // these return dexie queries to be used with useLiveQuery

  /** Returns all dones we know about  */
  const all = async () => {
    return db.dones.toArray()
  }

  /** Returns all dones for the given date range */
  const forDateRange = (start: LocalDate | string, end: LocalDate | string) => async () => {
    const sStart = start.toString()
    const sEnd = end.toString()
    return db.dones.where("date").between(sStart, sEnd, true, true).sortBy("timestamp")
  }

  // WRITE

  /** Adds a done for a specified user */
  const add = ({ content, date, userId, likes = [] }: PartialDoneData) => {
    const handle = repo.create<DoneData>()
    const id = handle.url

    handle.change(t => {
      t.id = id
      t.content = content
      t.date = date
      t.userId = userId
      t.likes = likes
      t.timestamp = Date.now() as Timestamp
    })

    // update state with new done
    changeState((s: SharedState) => {
      s.dones.push(id)
    })
  }

  /** Adds a done for the current user */
  const addForCurrentUser = (content: string, date: LocalDate) => {
    add({
      content,
      date: date.toString(),
      userId,
      likes: [],
    })
  }

  /** Removes the done with the given id */
  const destroy = (id: AutomergeUrl) => {
    changeState((s: SharedState) => {
      const dones = s.dones as ExtendedArray<AutomergeUrl>
      const index = dones.indexOf(id)
      dones.deleteAt(index)
    })
  }

  /** Removes all dones */
  const destroyAll = () => {
    changeState((s: SharedState) => {
      s.dones = []
    })
  }

  return {
    // read
    all,
    forDateRange,

    // write
    add,
    addForCurrentUser,
    destroy,
    destroyAll,
  }
}
