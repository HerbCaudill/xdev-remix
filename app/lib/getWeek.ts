import { LocalDate } from "@js-joda/core"
import { getSunday } from "~/lib/getSunday"

export function getWeek(date: LocalDate) {
  const start = getSunday(date)
  const end = start.plusDays(6)

  const week = { start: start.toString(), end: end.toString() }
  return week
}
