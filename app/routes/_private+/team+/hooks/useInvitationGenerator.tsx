import { useDocument } from "@automerge/automerge-repo-react-hooks"
import type { UnixTimestamp } from "@localfirst/auth"
import { randomKey } from "@localfirst/crypto"
import { HOUR } from "lib/constants"
import { useTeam } from "hooks/useTeam"
import { Contact, ExtendedContact } from "types/types"

export function useInvitationGenerator(contact?: ExtendedContact) {
  const [invitationCode, setInvitationCode] = useState<string>()

  const { team, self } = useTeam()
  const [_, changeContactDoc] = useDocument<Contact>(contact?.documentId)

  useEffect(() => {
    // Generate a new invitation if we're an admin, the contact has loaded, and we haven't just now generated one
    if (self?.isAdmin && contact && !invitationCode) {
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
  }, [contact, invitationCode])

  return invitationCode
}
