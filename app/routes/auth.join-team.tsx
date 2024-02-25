import { InvitationForm } from "../ui/InvitationForm"
import { AuthSetupInfo } from "../context/types"

export default function JoinTeam() {
  const { userName } = useLocalState()
  const navigate = useNavigate()

  // hooks ↑

  if (!userName) {
    navigate("/auth/username")
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
