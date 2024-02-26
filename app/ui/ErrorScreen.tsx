import { isRouteErrorResponse, useRouteError } from "@remix-run/react"

export function ErrorScreen() {
  const error = useRouteError() as Error
  const isRouteError = isRouteErrorResponse(error)
  const isDevelopment = process.env.NODE_ENV === "development"

  const getMessage = (status: number) => {
    const path = window.location.pathname
    switch (status) {
      case 401:
        return <>Sorry, you are not authorized to view this page.</>
      case 403:
        return <>Sorry, you are not allowed to view this page.</>
      case 404:
        return (
          <>
            Sorry, couldn't find <strong>{path}</strong>.
          </>
        )
      case 500:
        return <>Sorry, something went wrong on our end.</>
      default:
        return undefined
    }
  }

  const output =
    isRouteError ?
      {
        status: error.status,
        statusText: error.statusText,
        message: getMessage(error.status),
      }
    : {
        status: error.name,
        statusText: error.message,
        data:
          error.stack
            ?.split("\n")
            .slice(1)
            .map(s => s.trim())
            .join("\n") ?? "",
      }

  if (!isRouteError) console.error(output)

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 px-2 pb-[10%] sm:px-12">
      <div className="min-w-[50%] max-w-full rounded-lg border border-neutral-300 bg-white p-4 sm:max-w-3xl">
        <div className="flex items-center gap-2 text-base font-semibold text-danger-700">
          <IconExclamationCircle className="inline-block h-6 w-6" />
          {output.status}
        </div>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-neutral-900">
          {output.statusText}
        </h1>
        <p className="mt-6 text-base leading-7 text-neutral-600"></p>
        {output.message ?
          <pre className="mt-6 text-sm leading-7 text-neutral-600">{output.message}</pre>
        : null}
        {isDevelopment && output.data ?
          <pre className="max-h-48 overflow-auto rounded-lg bg-neutral-50 p-2 text-[.6em]">
            {output.data}
          </pre>
        : null}
      </div>
    </main>
  )
}
