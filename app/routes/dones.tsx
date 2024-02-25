import { WeekNav } from "dones/components/WeekNav"
import { DonesNav } from "dones/components/DonesNav"

export default function Dones({ children }: { children: React.ReactNode }) {
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
