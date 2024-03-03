import { InvitationForm } from "context/auth/InvitationForm"
import { AuthSetupInfo } from "context/auth/types"
import { useLocalState } from "hooks/useLocalState"
import { button } from "ui/cva/button"

export default function JoinTeam() {
  const { userName } = useLocalState()
  const navigate = useNavigate()
  const invitationCodeFromUrl = useParams().code

  // hooks ↑

  if (!userName) {
    navigate("/auth/begin")
    return
  }

  const joinWithCode = (invitationCode: string) => {
    const setupInfo: AuthSetupInfo = {
      action: "join-team",
      userName,
      invitationCode,
    }
    navigate("/", { state: setupInfo })
  }

  return invitationCodeFromUrl ?
      <div
        className={cx(
          "m-auto", //
          "flex flex-col items-center gap-4 space-y-2",
        )}
      >
        <div className="text-5xl">
          <div className="inline-block -rotate-15 transform align-text-bottom">💌</div>
        </div>

        <p>You've clicked an invitation link to join a team.</p>
        <p>
          <button
            onClick={() => joinWithCode(invitationCodeFromUrl)}
            className={cx(button({ size: "lg", intent: "primary" }), "justify-stretch")}
          >
            Join
          </button>
        </p>
      </div>
    : <InvitationForm heading="Join a team" onSubmit={joinWithCode} />
}
