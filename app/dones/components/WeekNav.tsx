import { LocalDate } from "@js-joda/core"
import { useNavigationHotkey } from "hooks/useNavigationHotkey"
import { useSelectedWeek } from "hooks/useSelectedWeek"
import { formatDateRange } from "lib/formatDateRange"
import { getSunday } from "lib/getSunday"

export const WeekNav = () => {
  const week = useSelectedWeek()
  const start = LocalDate.parse(week.start)
  const end = LocalDate.parse(week.end)

  const { pathname } = useLocation()
  const { date } = useParams()

  const current = pathname.replace(date!, getSunday().toString())
  const prev = pathname.replace(date!, start.minusWeeks(1).toString())
  const next = pathname.replace(date!, start.plusWeeks(1).toString())

  useNavigationHotkey("t", current)
  useNavigationHotkey("p,j,pageup", prev)
  useNavigationHotkey("n,k,pagedown", next)

  return (
    <div className="flex flex-row my-2 gap-1 items-center">
      <NavLink
        className="button button-xs button-white"
        title="Today (t)"
        relative="path"
        to={current}
        children="Today"
      />
      <NavLink
        className="button button-xs button-white"
        title="Previous week (p)"
        relative="path"
        to={prev}
        children="<"
      />
      <NavLink
        className="button button-xs button-white"
        title="Next week (n)"
        relative="path"
        to={next}
        children=">"
      />
      <span className="mx-2 text-2xl font-medium">{formatDateRange(start, end)}</span>
    </div>
  )
}
