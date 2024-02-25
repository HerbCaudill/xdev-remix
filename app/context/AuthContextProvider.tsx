import { type Repo } from "@automerge/automerge-repo"
import { RepoContext } from "@automerge/automerge-repo-react-hooks"
import { type AuthProvider } from "@localfirst/auth-provider-automerge-repo"
import { type Location } from "@remix-run/react"
import { AuthContext } from "./AuthContext"
import { setupAuth } from "./setupAuth"
import { AuthSetupInfo } from "./types"

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  // Persisted state
  const { user, device, shareId, updateLocalState } = useLocalState()

  // Local (component) state
  const [state, setState] = useState<{ team: Team; auth: AuthProvider; repo: Repo }>()

  // Setup info routed back to us from the auth flow
  const { state: setupInfo } = useLocation() as Location<AuthSetupInfo>

  // On first render, check local storage for persisted state
  useEffect(() => {
    if (device) {
      // We've used the app before - use our existing user & device to instantiate the auth provider and the repo.
      initializeAuthRepo({ user, device }).then(({ auth, repo }) => {
        // Get the team from the auth provider (which will have loaded it from storage).
        const team = auth.getTeam(shareId!)
        setState({ team, auth, repo })
      })
    } else if (setupInfo) {
      setupAuth(setupInfo).then(({ user, device, team, auth, repo }) => {
        updateLocalState({ user, device })
        setState({ team, auth, repo })
      })
    } else {
      // First time use - get username & proceed with auth flow
      navigate("/auth/username")
    }
  }, [])

  // hooks ↑

  if (device && user && state) {
    const { team, auth, repo } = state
    return (
      <RepoContext.Provider value={repo}>
        <AuthContext.Provider value={{ device, user, team, auth }}>{children}</AuthContext.Provider>
      </RepoContext.Provider>
    )
  } else return <Loading />
}
