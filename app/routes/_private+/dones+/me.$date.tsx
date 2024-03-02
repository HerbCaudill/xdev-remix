import { LocalDate } from "@js-joda/core"
import { useAuth } from "context/auth/useAuth"
import { useLiveQuery } from "dexie-react-hooks"
import { useSelectedWeek } from "hooks/useSelectedWeek"
import { useDones } from "./hooks/useDones"
import { CalendarWeek } from "./ui/CalendarWeek"

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
