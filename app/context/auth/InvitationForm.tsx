import { button } from "ui/cva/button"

export function InvitationForm({ heading, onSubmit }: Props) {
  const params = useParams()

  const [invitationCode, setInvitationCode] = useState<string | undefined>(params["*"])

  // hooks ↑

  return (
    <form
      className={cx(["flex flex-col space-y-4 p-4"])}
      onSubmit={async e => {
        e.preventDefault()
        if (!invitationCode || invitationCode.length === 0) return
        onSubmit(invitationCode)
      }}
    >
      <h3 className="text-lg font-bold">{heading}</h3>

      <p className="">
        <label htmlFor="invitationCode">Enter your invitation code:</label>
      </p>

      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <input
          type="text"
          className="textbox-auth flex-grow"
          id="invitationCode"
          name="invitationCode"
          autoFocus
          value={invitationCode}
          onChange={e => setInvitationCode(e.target.value)}
        />
        <button
          type="submit"
          className={cx(button({ intent: "primary" }), "justify-center sm:justify-stretch")}
        >
          Join team
        </button>
      </div>
    </form>
  )
}

type Props = {
  heading: string
  onSubmit: (invitationCode: string) => void
}
