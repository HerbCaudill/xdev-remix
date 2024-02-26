import { useTeam } from "routes/auth+/hooks/useTeam"
import { useLiveQuery } from "dexie-react-hooks"
import { DoneDisplay } from "routes/_private+/dones+/ui/DoneDisplay"
import { useDones } from "routes/_private+/dones+/hooks/useDones"
import { useSelectedWeek } from "hooks/useSelectedWeek"
import { DoneData } from "types/types"
import { Avatar } from "ui/Avatar"

export default function TeamDones() {
  const { start, end } = useSelectedWeek()

  const { forDateRange } = useDones()

  const dones = useLiveQuery(forDateRange(start, end), [start, end], []) as DoneData[]

  const { contacts } = useTeam()

  const byUser = dones.reduce<Record<string, DoneData[]>>((userDones, doneData) => {
    if (userDones[doneData.userId]) userDones[doneData.userId].push(doneData)
    else userDones[doneData.userId] = [doneData]
    return userDones
  }, {})

  return (
    <div className="sm:grid sm:grid-cols-3 lg:grid-cols-5">
      {contacts.map(c => (
        <div className="block w-full p-3" key={c.userId}>
          {/* user's avatar & photo */}
          <h2 className="mb-2 border-b border-b-black pb-2 text-2xl font-bold tracking-tight text-neutral-900">
            <Avatar className="mr-2" userId={c.userId} />
            <span className="text-lg font-normal">{c.firstName}</span>
          </h2>
          {/* user's dones */}
          <ul className="flex flex-col divide-y font-normal text-neutral-700 dark:text-neutral-400">
            {byUser[c.userId]?.map(({ id }) => (
              <DoneDisplay key={id} doneId={id} className="py-1" />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
