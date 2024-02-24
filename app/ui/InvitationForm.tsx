export const InvitationForm = ({ heading, onSubmit }: Props) => {
  const [invitationCode, setInvitationCode] = useState<string>("")

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
      <h3 className="font-bold text-lg">{heading}</h3>

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
          className="button button-sm button-primary justify-center sm:justify-stretch"
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
