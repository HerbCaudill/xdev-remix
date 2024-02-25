import { AuthContext } from "routes/auth+/lib/AuthContextProvider"

// Convenience wrapper around our authContext for accessing the auth data and provider
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthContextProvider")
  return context
}
