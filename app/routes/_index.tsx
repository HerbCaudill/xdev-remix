import { useRedirect } from "hooks/useRedirect"

export default function Index() {
  useRedirect({ from: "/", to: "/dones" })

  return (
    <div className="border-4 border-red-500 p-10">
      <Outlet />
    </div>
  )
}
