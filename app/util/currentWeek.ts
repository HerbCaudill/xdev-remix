import { LocalDate } from "@js-joda/core"
import { getSunday } from "./getSunday"

export const currentWeek = () => {
  const today = LocalDate.now()
  const start = getSunday(today)
  const end = start.plusDays(6)
  return {
    start: start.toString(),
    end: end.toString(),
  }
}
