import { Dialog } from "ui/Dialog"
import { CopyCode } from "./CopyCode"
import { button } from "ui/cva/button"
import { Props } from "../invite"

export function InviteMemberDialog({ afterLeave, contact, invitationCode }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(true)
  }, [contact])

  if (!invitationCode) return null
  return (
    <Dialog
      isOpen={isOpen}
      title={`Invite member`}
      onClose={() => setIsOpen(false)}
      afterLeave={afterLeave}
      children={
        <div className="flex flex-col space-y-4">
          <p>Copy this code and send it to {contact.firstName}.</p>
          <CopyCode code={invitationCode!} />
        </div>
      }
      buttons={
        <button
          className={button({ intent: "primary", size: "md" })}
          onClick={() => setIsOpen(false)}
        >
          Done
        </button>
      }
    />
  )
}
