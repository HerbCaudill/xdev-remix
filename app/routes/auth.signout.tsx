import { useLocalState } from "hooks/useLocalState"

export default function SignOut() {
  const { updateLocalState } = useLocalState()
  const [showWarning, setShowWarning] = useState(true)
  const navigate = useNavigate()

  const signOut = () => {
    setShowWarning(false)
    updateLocalState({ userName: undefined })
    // TODO: clear out data
  }

  return showWarning ?
      <div className="flex flex-col gap-2">
        <div className="rounded-md bg-danger-50 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <IconExclamationCircle className="size-12 text-danger-700" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-bold text-danger-700">Are you sure?</h3>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2 text-red-700">
            <p>All team data will be removed from this device.</p>
            <p>
              If you want to use XDev again on this device, you'll need to reauthorize it from
              another device, or be re-invited to the team.
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Link className="button button-md button-white" to="/">
            No, go back
          </Link>
          <span className="grow" />
          <button className="button button-md button-danger" onClick={signOut}>
            Yes, sign out
          </button>
        </div>
      </div>
    : <div className="flex flex-col items-center gap-4 ">
        <span className="text-4xl p-4">👋</span>
        <p>You've been signed out.</p>
        <p>
          <Link to="/" className="button button-md button-primary">
            Sign in again
          </Link>
        </p>
      </div>
}
