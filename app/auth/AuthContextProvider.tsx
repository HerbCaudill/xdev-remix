import { type Repo } from "@automerge/automerge-repo"
import { RepoContext } from "@automerge/automerge-repo-react-hooks"
import { type AuthProvider } from "@localfirst/auth-provider-automerge-repo"
import { type Location } from "@remix-run/react"
import { useLocalState } from "hooks/useLocalState"
import { getRootDocumentIdFromTeam } from "auth/getRootDocumentIdFromTeam"
import { initializeAuthRepo } from "auth/initializeAuthRepo"
import { Loading } from "ui/Loading"
import { setupAuth } from "./setupAuth"
import { AuthSetupInfo } from "./types"
import { AuthState } from "types"

/**
 * This provider wraps the entire app. We can be in three possible states when we load:
 *
 * (A) We've used the app before. We'll know this is the case because we'll have a user & device in
 *     local storage. We can use these to instantiate the auth provider and the repo, each of which
 *     will have their own stuff in indexedDb.
 *
 * (B) We've just completed the auth flow and we've been redirected back here. We'll know this is the
 *     case because the auth routes will use Remix's location state to pass back some setup info
 *     (e.g. a team name if we're creating a team, or an invitation code if we're joining a team),
 *     which will allow us to instantiate the user, device, team, auth provider, and repo.
 *
 * (C) This is the very first load on first use. In this case, we need to start the auth flow by
 *     redirecting to another route.
 */
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  // Persisted state
  const { user, device, shareId, updateLocalState } = useLocalState()

  // Setup info routed back to us from the auth flow
  const { state: setupInfo } = useLocation() as Location<AuthSetupInfo>

  // Internal component state
  const [state, setState] = useState<{ team: Team; auth: AuthProvider; repo: Repo }>()

  // On first render, check local storage for persisted state
  useEffect(() => {
    if (device && user && shareId) {
      // (A) We've used the app before - use our existing user & device to instantiate the auth provider and the repo.
      initializeAuthRepo({ user, device }).then(({ auth, repo }) => {
        // Get the team from the auth provider (which will have loaded it from storage).
        const team = auth.getTeam(shareId)
        // Now we have everything we need
        setState({ team, auth, repo })
      })
    } else if (setupInfo) {
      // (B) We've just completed the auth flow - use the setup info to instantiate the user, device, auth provider, and repo.
      setupAuth(setupInfo).then(({ user, device, team, auth, repo }) => {
        // The root document ID is stored on the team - get it and persist it locally.
        const rootDocumentId = getRootDocumentIdFromTeam(team)
        updateLocalState({ user, device, rootDocumentId })
        // Now we have everything we need
        setState({ team, auth, repo })
      })
    } else {
      // (C) Very first use - begin the auth flow
      navigate("/auth/begin")
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

export const AuthContext = createContext<AuthState | undefined>(undefined)
