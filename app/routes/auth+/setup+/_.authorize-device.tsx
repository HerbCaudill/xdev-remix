import { AuthSetupInfo } from "routes/auth+/lib/types"
import { useLocalState } from "hooks/useLocalState"
import { InvitationForm } from "routes/auth+/lib/InvitationForm"

export default function AuthorizeDevice() {
  const { userName } = useLocalState()
  const navigate = useNavigate()

  // hooks ↑

  if (!userName) {
    navigate("/auth/begin")
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
