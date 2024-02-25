import { AuthContext } from "~/auth/AuthContext"

// Convenience wrapper around our authContext for accessing the auth data and provider
export const useAuth = () => {
  const context = useContext(AuthContext)
  console.log("useAuth context", context)
  if (!context) throw new Error("useAuth must be used within an AuthContextProvider")
  return context
}
