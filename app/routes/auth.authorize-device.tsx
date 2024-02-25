import { AuthSetupInfo } from "auth/types"
import { useLocalState } from "hooks/useLocalState"
import { InvitationForm } from "ui/InvitationForm"

export default function AuthorizeDevice() {
  const { userName } = useLocalState()
  const navigate = useNavigate()

  // hooks ↑

  if (!userName) {
    navigate("/auth/username")
    return
  }

  return (
    <InvitationForm
      heading="Authorize a device"
      onSubmit={invitationCode => {
        const setupInfo: AuthSetupInfo = {
          action: "authorize-device",
          userName,
          invitationCode,
        }
        navigate("/", { state: setupInfo })
      }}
    />
  )
}
