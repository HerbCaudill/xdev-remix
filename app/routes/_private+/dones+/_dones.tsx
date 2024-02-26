import { DonesNav } from "routes/_private+/dones+/ui/DonesNav"
import { WeekNav } from "routes/_private+/dones+/ui/WeekNav"
import { useRedirect } from "hooks/useRedirect"

export default function Dones({ children }: { children: React.ReactNode }) {
  useRedirect({ from: "/dones", to: "/dones/me" })
  return (
    <>
      {/* top navigation */}
      <DonesNav />
      {/* week navigation */}
      <div className="px-2">
        <WeekNav />
      </div>
      <div className="grow px-2">
        <Outlet />
      </div>
    </>
  )
}
