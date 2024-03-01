import { randomKey } from "@localfirst/crypto"
import type { UnixTimestamp } from "@localfirst/auth"
import { useDocument } from "@automerge/automerge-repo-react-hooks"
import { useTeam } from "routes/auth+/hooks/useTeam"
import { Contact } from "types/types"
import { HOUR } from "lib/constants"
import { Dialog } from "ui/Dialog"
import { CopyCode } from "./CopyCode"
import { button } from "../../../../ui/cva/button"

export const InviteMember = ({ userId }: { userId: string }) => {
  const navigate = useNavigate()
  const [invitationCode, setInvitationCode] = useState<string>()
  const { contactMap, team, self } = useTeam()
  const contactDocumentId = contactMap[userId]?.documentId as DocumentId
  const [contactDoc, changeContactDoc] = useDocument<Contact>(contactDocumentId)

  const { firstName, lastName } = contactDoc ?? {}

  // ----- ↑ hooks

  // Only admins can invite new members
  if (!self?.isAdmin) return null

  const inviteMember = () => {
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

  const onCancel = () => {
    navigate("..")
  }
  return (
    <Dialog
      isOpen={true}
      title={`Invite member`}
      onClose={onCancel}
      children={
        <div className="flex flex-col space-y-4">
          <p>Copy this code and send it to {firstName}.</p>
          <CopyCode code={invitationCode!} />
        </div>
      }
      buttons={
        <>
          <button onClick={onCancel} className={button({ intent: "primary" })}>
            Done
          </button>
        </>
      }
    />
  )
}
