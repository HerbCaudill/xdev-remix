import { type Repo } from "@automerge/automerge-repo"
import { type RepoContext } from "@automerge/automerge-repo-react-hooks"
import { type AuthProvider } from "@localfirst/auth-provider-automerge-repo"
import { type Location } from "@remix-run/react"

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  let location = useLocation() as Location<AuthState & { repo: Repo }>

  // Persisted state
  const { user, device, shareId, updateLocalState } = useLocalState()

  // Local (component) state
  const [team, setTeam] = useState<Team>()
  const [auth, setAuth] = useState<AuthProvider>()
  const [repo, setRepo] = useState<Repo>()

  // On first render, check local storage for persisted state
  useEffect(() => {
    if (device && user) {
      assert(shareId)
      // We've used the app before - use our existing user & device to instantiate the auth provider and the repo.
      initializeAuthRepo({ user, device }).then(({ auth, repo }) => {
        // Get the team from the auth provider (which will have loaded it from storage).
        const team = auth.getTeam(shareId)
        setTeam(team)
        setAuth(auth)
        setRepo(repo)
      })
    } else if (location.state) {
      // We're coming back from auth flow with everything we need
      const { device, user, team, auth, repo } = location.state
      setTeam(team)
      setAuth(auth)
      setRepo(repo)
      updateLocalState({ user, device, shareId: getShareId(team) })
    } else {
      // First time use - get username & proceed with auth flow
      navigate("/auth/username")
    }
  }, [])

  if (device && user && team && auth && repo) {
    return (
      <RepoContext.Provider value={repo}>
        <AuthContext.Provider value={{ device, user, team, auth }}>{children}</AuthContext.Provider>
      </RepoContext.Provider>
    )
  }

  return <Loading />
}
