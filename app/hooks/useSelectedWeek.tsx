import { LocalDate } from "@js-joda/core"

export const useSelectedWeek = () => {
  const { date: dateString } = useParams()
  const today = LocalDate.now()
  const date = dateString ? LocalDate.parse(dateString) : today
  const week = getWeek(date)
  return week
}
