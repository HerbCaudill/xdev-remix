import { isRouteErrorResponse, useRouteError } from "@remix-run/react"

export function Error() {
  const error = useRouteError() as Error

  const d =
    isRouteErrorResponse(error) ?
      {
        status: error.status,
        statusText: error.statusText,
        data: error.data,
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

  return (
    <main className="h-screen  flex flex-col gap-2 items-center justify-center px-2 sm:px-12 pb-[10%]">
      <div className="border max-w-full sm:max-w-3xl border-neutral-300 rounded-lg bg-white p-4 ">
        <div className="flex items-center gap-2 text-base font-semibold text-danger-700">
          <IconExclamationCircle className="w-6 h-6 inline-block" />
          {d.status}
        </div>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900">{d.statusText}</h1>
        <p className="mt-6 text-base leading-7 text-gray-600"></p>
        <pre className="rounded-lg p-2 text-[.6em] max-h-48 bg-neutral-50 overflow-auto">
          {d.data}
        </pre>
      </div>
    </main>
  )
}
