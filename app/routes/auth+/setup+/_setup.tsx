import { useLocalState } from "hooks/useLocalState"
import { button } from "ui/cva/button"

/**
 * This is the first time we've used the app. We need a device, a user, and a team.
 *
 * - The device is always created locally.
 * - The user is created locally except when we're joining a team as a new device for an existing
 *   user, in which case we get the user once we've joined.
 * - There are three ways to get a team: (a) use an invitation to join a team as a new member; (b)
 *   use an invitation to join a team as a new device for an existing member; (c) create a new team.
 */
export default function AuthChoices() {
  const { userName } = useLocalState()
  const navigate = useNavigate()

  // hooks ↑

  if (!userName) navigate("/auth/begin")

  const options = [
    {
      icon: <div className="-rotate-15 transform">💌</div>,
      label: "Have an invitation code?",
      buttonText: "Join a team",
      target: "/auth/setup/join-team",
      autoFocus: true,
    },
    {
      icon: <div className="rotate-12 transform">📱</div>,
      label: "Already joined on another device?",
      buttonText: "Authorize this device",
      target: "/auth/setup/authorize-device",
    },
    {
      icon: "🙋",
      label: "Starting something new?",
      buttonText: "Create a team",
      target: "/auth/setup/create-team",
    },
  ]

  return (
    <div className="grid grid-cols-3 content-center items-center ">
      {options.map(({ icon, label, buttonText, target, autoFocus }, i) => (
        <Fragment key={i}>
          <div className="row-span-3 grid grid-rows-subgrid text-center">
            <div className="text-5xl">
              <div className="inline-block align-text-bottom">{icon}</div>
            </div>
            <div className="text-balance p-5">{label}</div>
            <div className="p-3">
              <Link
                to={target}
                className={cx(
                  button({ intent: "primary", size: "lg" }),
                  "h-full w-full justify-center",
                )}
                autoFocus={autoFocus}
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
