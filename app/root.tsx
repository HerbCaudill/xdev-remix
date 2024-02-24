import "@ibm/plex/css/ibm-plex.css"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import "~/index.css"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <title>XDev</title>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/local-maskable-192x192.png" />
        <link rel="mask-icon" href="/favicon.ico" color="#000000" />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function HydrateFallback() {
  return <Loading />
}

// export function ErrorBoundary() {
//   const error = useRouteError() as Error

//   if (isRouteErrorResponse(error)) {
//     return (
//       <>
//         <h1>
//           {error.status} {error.statusText}
//         </h1>
//         <p>{error.data}</p>
//       </>
//     )
//   }

//   return (
//     <>
//       <h1>Error!</h1>
//       <p>{error?.message ?? "Unknown error"}</p>
//     </>
//   )
// }
