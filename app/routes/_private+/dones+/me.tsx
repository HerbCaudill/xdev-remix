import { getSunday } from "lib/getSunday"
import { useRedirect } from "hooks/useRedirect"

const currentWeek = getSunday().toString()

export default function Me() {
  useRedirect({ from: "/dones/me", to: `/dones/me/${currentWeek}` })
  return <Outlet />
}
