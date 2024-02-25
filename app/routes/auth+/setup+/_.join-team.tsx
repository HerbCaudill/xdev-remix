import { AuthSetupInfo } from "routes/auth+/lib/types"
import { useLocalState } from "hooks/useLocalState"
import { InvitationForm } from "routes/auth+/lib/InvitationForm"

export default function JoinTeam() {
  const { userName } = useLocalState()
  const navigate = useNavigate()

  // hooks ↑

  if (!userName) {
    navigate("/auth/begin")
    return
  }

  return (
    <InvitationForm
      heading="Join a team"
      onSubmit={invitationCode => {
        const setupInfo: AuthSetupInfo = {
          action: "join-team",
          userName,
          invitationCode,
        }
        navigate("/", { state: setupInfo })
      }}
    />
  )
}
