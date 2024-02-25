import { LocalDate } from "@js-joda/core"
import { useAuth } from "auth/useAuth"
import { useLiveQuery } from "dexie-react-hooks"
import { CalendarWeek } from "dones/components/CalendarWeek"
import { useDones } from "dones/hooks/useDones"
import { useSelectedWeek } from "hooks/useSelectedWeek"
import { DoneData } from "types"

export function MyDones() {
  const { user } = useAuth()
  const { start, end } = useSelectedWeek()
  const { forDateRange } = useDones()

  const dones = useLiveQuery(forDateRange(start, end), [start, end], []) //
    .filter(d => d.userId === user.userId)

  return <CalendarWeek start={LocalDate.parse(start)} dones={dones} />
}
