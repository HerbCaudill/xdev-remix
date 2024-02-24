import { useContext } from "react"
import { DbContext } from "../db"

// Convenience wrapper around our SharedStateContext for accessing pieces of repo state
export const useDb = () => useContext(DbContext)
