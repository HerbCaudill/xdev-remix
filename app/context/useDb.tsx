import { DbContext } from "context/DbProvider"

// Convenience wrapper around our SharedStateContext for accessing pieces of repo state
export function useDb() {
  return useContext(DbContext)
}
