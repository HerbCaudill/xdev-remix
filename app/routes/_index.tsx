import { useRedirect } from "lib/useRedirect"

export default function Index() {
  useRedirect({ from: "/", to: "/dones" })
  return <Outlet />
}
