import { useLocalState } from "hooks/useLocalState"
import { button } from "ui/cva/button"

export default function SignOut() {
  const { shareId, signOut } = useLocalState()
  const [showWarning, setShowWarning] = useState(true)

  // hooks ↑

  const onConfirm = () => {
    setShowWarning(false)

    // remove our user & device info from local storage
    signOut()

    // nuke indexeddb
    indexedDB.deleteDatabase("xdev")
    indexedDB.deleteDatabase("automerge")
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
          <div className="mt-2 flex flex-col gap-2 text-red-700">
            <p>All team data will be removed from this device.</p>
            <p>
              If you want to use XDev again on this device, you'll need to reauthorize it from
              another device, or be re-invited to the team.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link className={button({ size: "md" })} to="/">
            No, go back
          </Link>
          <span className="grow" />
          <button className={button({ size: "md", color: "danger" })} onClick={onConfirm}>
            Yes, sign out
          </button>
        </div>
      </div>
    : <div className="flex flex-col items-center gap-4 ">
        <span className="p-4 text-4xl">👋</span>
        <p>You've been signed out.</p>
        <p>
          <a href="/" className={button({ size: "md", color: "primary" })}>
            Sign in again
          </a>
        </p>
      </div>
}
