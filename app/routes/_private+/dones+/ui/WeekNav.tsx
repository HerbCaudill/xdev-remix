import { LocalDate } from "@js-joda/core"
import { useNavigationHotkey } from "hooks/useNavigationHotkey"
import { useSelectedWeek } from "hooks/useSelectedWeek"
import { formatDateRange } from "lib/formatDateRange"
import { getSunday } from "lib/getSunday"
import { twMerge } from "tailwind-merge"
import { button } from "ui/cva/button"

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

  const buttonStyle = twMerge(button(), "px-4")
  return (
    <div className="flex flex-row my-2 gap-2 items-stretch">
      <NavLink
        className={buttonStyle}
        title="Previous week (p)"
        relative="path"
        to={prev}
        children={<IconCaretLeftFilled className="size-4" />}
      />
      <NavLink
        className={buttonStyle}
        title="Today (t)"
        relative="path"
        to={current}
        children={
          <>
            <IconCalendarDue className="size-4" />
            <span>Today</span>
          </>
        }
      />
      <NavLink
        className={buttonStyle}
        title="Next week (n)" //
        relative="path"
        to={next}
        children={<IconCaretRightFilled className="size-4" />}
      />
      <span className="mx-2 text-xl tracking-tight font-serif">{formatDateRange(start, end)}</span>
    </div>
  )
}
