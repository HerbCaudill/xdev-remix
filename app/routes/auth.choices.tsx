/**
 * This is the first time we've used the app. We need a device, a user, and a team.
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

  if (!userName) navigate("/auth/username")

  const options = [
    {
      icon: <div className="transform -rotate-15">💌</div>,
      label: "Have an invitation code?",
      buttonText: "Join a team",
      target: "/auth/join-team",
      autoFocus: true,
    },
    {
      icon: <div className="transform rotate-12">📱</div>,
      label: "Already joined on another device?",
      buttonText: "Authorize this device",
      target: "/auth/authorize-device",
    },
    {
      icon: "🙋",
      label: "Starting something new?",
      buttonText: "Create a team",
      target: "/auth/create-team",
    },
  ]

  return (
    <div className="grid grid-cols-3 content-center items-center ">
      {options.map(({ icon, label, buttonText, target, autoFocus }, i) => (
        <Fragment key={i}>
          <div className="grid grid-rows-subgrid row-span-3 text-center">
            <div className="text-5xl">
              <div className="align-text-bottom inline-block">{icon}</div>
            </div>
            <div className="p-5 text-balance">{label}</div>
            <div className="p-3">
              <Link
                to={target}
                className="button button-sm button-primary w-full h-full justify-center"
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
