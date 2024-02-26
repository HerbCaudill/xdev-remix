import { useDocument } from "@automerge/automerge-repo-react-hooks"
import type { UnixTimestamp } from "@localfirst/auth"
import { randomKey } from "@localfirst/crypto"
import { HOUR } from "lib/constants"
import { useTeam } from "routes/auth+/hooks/useTeam"
import { Contact } from "types/types"
import { Dialog } from "ui/Dialog"
import { CopyCode } from "./ui/CopyCode"
import { button } from "ui/cva/button"

export default function InviteMember() {
  const { userId } = useLocation().state as { userId: string }

  const [invitationCode, setInvitationCode] = useState<string>()
  const { contactMap, team, self } = useTeam()
  const contactDocumentId = contactMap[userId]?.documentId as DocumentId
  const [contactDoc, changeContactDoc] = useDocument<Contact>(contactDocumentId)
  const { firstName, lastName } = contactDoc ?? {}

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(true)
  }, [])

  useEffect(() => {
    if (isOpen && self?.isAdmin && !invitationCode) {
      const seed = randomKey(4)

      // Create an invitation that expires in 48 hours and can only be used once
      const expiration = (Date.now() + 48 * HOUR) as UnixTimestamp
      const maxUses = 1
      const { id } = team.inviteMember({ seed, expiration, maxUses })

      // Record the invitation on the contact's document
      changeContactDoc(s => (s.invitationId = id))

      // The "invitation code" that we give the member is the shareId + the invitation seed
      const shareId = getShareId(team)
      setInvitationCode(`${shareId}${seed}`)
    }
  }, [self, isOpen, invitationCode])

  // ----- ↑ hooks

  // Only admins can invite new members
  if (!self?.isAdmin) return null

  return (
    <Dialog
      isOpen={isOpen}
      title={`Invite member`}
      onClose={() => setIsOpen(false)}
      afterLeave={() => navigate("..")}
      children={
        <div className="flex flex-col space-y-4">
          <p>Copy this code and send it to {firstName}.</p>
          <CopyCode code={invitationCode!} />
        </div>
      }
      buttons={
        <button
          className={button({ color: "primary", size: "md" })}
          onClick={() => setIsOpen(false)}
        >
          Done
        </button>
      }
    />
  )
}
