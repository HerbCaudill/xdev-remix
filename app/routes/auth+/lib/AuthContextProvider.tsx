import { type Repo } from "@automerge/automerge-repo"
import { RepoContext } from "@automerge/automerge-repo-react-hooks"
import { type AuthProvider } from "@localfirst/auth-provider-automerge-repo"
import { type Location } from "@remix-run/react"
import { useLocalState } from "hooks/useLocalState"
import { getRootDocumentIdFromTeam } from "routes/auth+/lib/getRootDocumentIdFromTeam"
import { initializeAuthRepo } from "routes/auth+/lib/initializeAuthRepo"
import { Loading } from "ui/Loading"
import { setupAuth } from "./setupAuth"
import { AuthSetupInfo } from "./types"
import { AuthState } from "types"
import { assert } from "lib/assert"

/**
 * This provider wraps the entire app. We can be in three possible scenarios when we load:
 *
 * (A) FIRST LOAD
 *     This is the very first load on first use. In this case, we need to start the auth flow by
 *     redirecting to another route.
 *
 * (B) COMPLETING AUTH FLOW
 *     We've just gone through the auth flow and we've been redirected back here. We'll know this is
 *     the case because the auth routes will use Remix's location state to pass back some setup info
 *     (e.g. a team name if we're creating a team, or an invitation code if we're joining a team),
 *     which will allow us to instantiate the user, device, team, auth provider, and repo.
 *
 * (C) ALREADY AUTHENTICATED
 *     We've used the app before. We'll know this is the case because we'll have a user & device in
 *     local storage. We can use these to instantiate the auth provider and the repo, each of which
 *     will have their own stuff in indexedDb.
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
    const scenario =
      device ? "ALREADY_AUTHENTICATED"
      : setupInfo ? "COMPLETING_AUTH_FLOW"
      : "FIRST_LOAD"

    console.log("AuthContextProvider", scenario)

    switch (scenario) {
      case "FIRST_LOAD":
        // start the auth flow
        navigate("/auth/begin")
        break
      case "COMPLETING_AUTH_FLOW":
        // process the setup info to get the team etc.
        setupAuth(setupInfo).then(({ user, device, team, auth, repo }) => {
          // The root document ID is stored on the team - get it and persist it locally.
          const rootDocumentId = getRootDocumentIdFromTeam(team)
          // The shareId is derived from the teamId
          const shareId = getShareId(team)
          updateLocalState({ user, device, rootDocumentId, shareId })
          // Now we have everything we need
          setState({ team, auth, repo })
          navigate("/") // clear the setup info
        })
        break
      case "ALREADY_AUTHENTICATED": {
        assert(device)
        assert(shareId)
        // Initialize automerge repo with the auth provider
        initializeAuthRepo({ user, device }).then(({ auth, repo }) => {
          // Get the team from the auth provider (which will have loaded it from storage).
          const team = auth.getTeam(shareId)
          // Now we have everything we need
          setState({ team, auth, repo })
        })
        break
      }
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
