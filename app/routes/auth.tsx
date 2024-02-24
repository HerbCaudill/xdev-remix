import { Outlet } from "@remix-run/react"

export default function Auth() {
  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center pb-[10%]">
      <div className="w-full max-w-xl border border-neutral-300 rounded-lg bg-white p-4 ">
        {<Outlet />}
      </div>
    </div>
  )
}

type Props = {
  children: React.ReactNode
}
