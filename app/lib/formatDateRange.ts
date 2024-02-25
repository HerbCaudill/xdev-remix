import { type LocalDate } from "@js-joda/core"
import { formatDate } from "./formatDate"

export const formatDateRange = (start: LocalDate, end: LocalDate) => {
  const m1 = formatDate(start, "MMMM")
  const m2 = formatDate(end, "MMMM")
  const d1 = formatDate(start, "d")
  const d2 = formatDate(end, "d")
  const y1 = formatDate(start, "yyyy")
  const y2 = formatDate(end, "yyyy")

  // straddling two years: December 31, 2023 – January 6, 2024
  if (y1 !== y2) return `${m1} ${d1}, ${y1} – ${m2} ${d2}, ${y2}`

  // straddling two months: January 29 – February 4, 2023
  if (m1 !== m2) return `${m1} ${d1} – ${m2} ${d2}, ${y2}`

  // same month: January 1 – 7, 2023
  return `${m1} ${d1} – ${d2}, ${y2}`
}
