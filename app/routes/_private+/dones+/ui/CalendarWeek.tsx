import { type LocalDate } from "@js-joda/core"
import { getDaysOfWeek } from "lib/getDaysOfWeek"
import { DoneData } from "types/types"
import { CalendarDay } from "./CalendarDay"

export const CalendarWeek = ({ start, dones }: Props) => (
  <div
    className={cx(
      // mobile
      "grid grid-cols-[auto_1fr] ",
      // desktop
      "sm:grid-flow-col sm:grid-cols-7 sm:grid-rows-[auto_1fr] sm:divide-x ",
      // common
      "h-full w-full border border-b-0",
    )}
  >
    {getDaysOfWeek(start).map(date => {
      const donesOfDay = dones.filter(d => d.date === date.toString())
      return <CalendarDay key={date.toString()} date={date} dones={donesOfDay} />
    })}
  </div>
)

type Props = {
  start: LocalDate
  dones: DoneData[]
}
