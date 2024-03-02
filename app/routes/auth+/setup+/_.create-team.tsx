import { AuthSetupInfo } from "context/auth/types"
import { useLocalState } from "hooks/useLocalState"
import { button } from "ui/cva/button"

export default function CreateTeam() {
  const [teamName, setTeamName] = useState<string>("DevResults")
  const { userName } = useLocalState()
  const navigate = useNavigate()

  // hooks ↑

  if (!userName) {
    navigate("/auth/begin")
    return
  }

  return (
    <form
      className="flex flex-col space-y-4 p-4 "
      onSubmit={e => {
        e.preventDefault()
        if (!teamName || teamName.length === 0) return

        const setupInfo: AuthSetupInfo = {
          action: "create-team",
          userName,
          teamName,
        }
        navigate("/", { state: setupInfo })
      }}
    >
      <h3 className="text-lg font-bold">Create a team</h3>
      <p>
        <label htmlFor="teamName">Enter a name for your team:</label>
      </p>

      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <input
          type="text"
          className="textbox-auth w-[18em]"
          id="teamName"
          name="teamName"
          autoFocus
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
        />
        <button
          type="submit"
          className={cx(button({ intent: "primary" }), "justify-center sm:justify-stretch")}
        >
          Create team
        </button>
      </div>
    </form>
  )
}
