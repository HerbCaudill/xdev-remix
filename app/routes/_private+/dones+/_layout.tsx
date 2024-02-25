import { DonesNav } from "routes/_private+/dones+/ui/DonesNav"
import { WeekNav } from "routes/_private+/dones+/ui/WeekNav"
import { useRedirect } from "hooks/useRedirect"

export default function Dones({ children }: { children: React.ReactNode }) {
  useRedirect({ from: "/dones", to: "/dones/me" })
  return (
    <>
      {/* top navigation */}
      <div
        className={cx(
          "absolute top-0 z-10 bg-white w-full border-b h-12 shrink-0",
          "flex flex-row gap-2 items-end",
          "pl-16 lg:pl-2",
        )}
      >
        <DonesNav />
      </div>
      {/* week navigation */}
      <div className="px-2">
        <WeekNav />
      </div>
      <div className="px-2 grow">
        <Outlet />
      </div>
    </>
  )
}
