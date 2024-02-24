import { useNavigate } from "@remix-run/react"
import { useEffect } from "react"
import { useLocalState } from "~/hooks/useLocalState"
import { AuthContext } from "./AuthContext"

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  const { userName, user, device } = useLocalState()

  useEffect(() => {
    if (!userName) navigate("/auth/username")
  }, [user, device])

  const team = undefined
  const auth = undefined
  return (
    //@ts-ignore
    <AuthContext.Provider value={{ device, user, team, auth }}>{children}</AuthContext.Provider>
  )
}
