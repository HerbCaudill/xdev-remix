import { getSunday } from "lib/getSunday"
import { useRedirect } from "lib/useRedirect"

const currentWeek = getSunday().toString()

export default function Layout() {
  useRedirect({ from: "/dones/me", to: `/dones/me/${currentWeek}` })
  return <Outlet />
}
