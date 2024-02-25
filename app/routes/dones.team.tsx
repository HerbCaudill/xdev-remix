import { useTeam } from "auth/useTeam"
import { useLiveQuery } from "dexie-react-hooks"
import { DoneDisplay } from "dones/components/DoneDisplay"
import { useDones } from "dones/hooks/useDones"
import { useSelectedWeek } from "hooks/useSelectedWeek"
import { DoneData } from "types"
import { Avatar } from "ui/Avatar"

export function TeamDones() {
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
        <div className="block p-3 w-full" key={c.userId}>
          {/* user's avatar & photo */}
          <h2 className="mb-2 pb-2 text-2xl font-bold tracking-tight text-gray-900 border-b border-b-black">
            <Avatar className="mr-2" userId={c.userId} />
            <span className="text-lg font-normal">{c.firstName}</span>
          </h2>
          {/* user's dones */}
          <ul className="flex flex-col font-normal text-gray-700 dark:text-gray-400 divide-y">
            {byUser[c.userId]?.map(({ id }) => (
              <DoneDisplay key={id} doneId={id} className="py-1" />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
