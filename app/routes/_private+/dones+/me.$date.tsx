import { LocalDate } from "@js-joda/core"
import { useLiveQuery } from "dexie-react-hooks"
import { useSelectedWeek } from "hooks/useSelectedWeek"
import { useDones } from "routes/_private+/dones+/hooks/useDones"
import { CalendarWeek } from "routes/_private+/dones+/ui/CalendarWeek"
import { useAuth } from "routes/auth+/hooks/useAuth"
import { WeekNav } from "./ui/WeekNav"

export default function MyDones() {
  const { user } = useAuth()
  const { start, end } = useSelectedWeek()
  const { forDateRange } = useDones()

  const dones = useLiveQuery(forDateRange(start, end), [start, end], []) //
    .filter(d => d.userId === user.userId)

  return (
    <div className="h-full">
      <CalendarWeek start={LocalDate.parse(start)} dones={dones} />
    </div>
  )
}
