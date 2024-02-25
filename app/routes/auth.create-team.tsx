import { useLocalState } from "hooks/useLocalState"
import { AuthSetupInfo } from "../auth/types"

export default function CreateTeam() {
  const [teamName, setTeamName] = useState<string>("")
  const { userName } = useLocalState()
  const navigate = useNavigate()

  // hooks ↑

  if (!userName) {
    navigate("/auth/username")
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
      <h3 className="font-bold text-lg">Create a team</h3>
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
        <button type="submit" className="button button-sm button-primary justify-center">
          Create team
        </button>
      </div>
    </form>
  )
}
