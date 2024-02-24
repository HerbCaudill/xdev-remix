import { useEffect, useState } from "react"
import { Spinner } from "../components/Spinner"

export function Loading() {
  const [hung, setHung] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHung(true)
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (!hung) return null
  return (
    <div className="flex flex-col w-full mt-24 items-center">
      <div className="flex flex-col space-y-3 w-[20em]">
        <h1 className="text-lg font-bold flex items-center space-x-2">
          <Spinner />
          <span>Loading...</span>
        </h1>
      </div>
    </div>
  )
}
