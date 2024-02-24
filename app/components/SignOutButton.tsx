import { getShareId } from "@localfirst/auth-provider-automerge-repo"
import { useAuth } from "../hooks/useAuth"
import { useLocalState } from "../hooks/useLocalState"

export const SignOutButton = ({ className }: { className?: string }) => {
  const { auth, team } = useAuth()
  const { signOut } = useLocalState()

  return (
    <button
      className={className}
      onClick={async () => {
        const shareId = getShareId(team)
        await auth.removeShare(shareId)
        signOut()
      }}
    >
      Sign out
    </button>
  )
}
