import { LocalDate } from "@js-joda/core"
import { useParams } from "react-router-dom"
import { getWeek } from "../util/getWeek"

export const useSelectedWeek = () => {
  const { date: dateString } = useParams()
  const today = LocalDate.now()
  const date = dateString ? LocalDate.parse(dateString) : today
  const week = getWeek(date)
  return week
}
