import { LocalDate } from "@js-joda/core"
import { useParams } from "@remix-run/react"
import { getWeek } from "lib/getWeek"

export const useSelectedWeek = () => {
  const { date: dateString } = useParams()
  const today = LocalDate.now()
  const date = dateString ? LocalDate.parse(dateString) : today
  const week = getWeek(date)
  return week
}
