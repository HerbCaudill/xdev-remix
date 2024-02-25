import { getSunday } from "lib/getSunday"
import { useRedirect } from "hooks/useRedirect"

const currentWeek = getSunday().toString()

export default function Team() {
  useRedirect({ from: "/dones/team", to: `/dones/team/${currentWeek}` })
  return <Outlet />
}
