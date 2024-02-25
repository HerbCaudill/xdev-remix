import { LocalDate } from "@js-joda/core"
import { useAuth } from "routes/auth+/hooks/useAuth"
import { useLiveQuery } from "dexie-react-hooks"
import { CalendarWeek } from "routes/_private+/dones+/ui/CalendarWeek"
import { useDones } from "routes/_private+/dones+/hooks/useDones"
import { useSelectedWeek } from "hooks/useSelectedWeek"

export default function MyDones() {
  const { user } = useAuth()
  const { start, end } = useSelectedWeek()
  const { forDateRange } = useDones()

  const dones = useLiveQuery(forDateRange(start, end), [start, end], []) //
    .filter(d => d.userId === user.userId)

  return <CalendarWeek start={LocalDate.parse(start)} dones={dones} />
}
