import "@ibm/plex/css/ibm-plex.css"
import { Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import "./index.css"
import { ErrorScreen } from "./ui/ErrorScreen"
import { Loading } from "./ui/Loading"

export default function App() {
  return <Outlet />
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Scripts />
      <ScrollRestoration />
    </>
  )
}

export function HydrateFallback() {
  return <Loading />
}

export function ErrorBoundary() {
  return <ErrorScreen />
}
