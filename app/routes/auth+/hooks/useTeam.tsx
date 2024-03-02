import { useDocuments } from "@automerge/automerge-repo-react-hooks"
import { by } from "lib/by"
import { Contact, ExtendedContact, InvitationStatus } from "types/types"
import { useRootDocument } from "hooks/useRootDocument"
import { useAuth } from "./useAuth"
import { Base58, Member } from "@localfirst/auth"

export function useTeam() {
  const { user, team } = useAuth()
  const [rootDoc] = useRootDocument()

  // Team members
  const { contacts: contactIds = [] } = rootDoc ?? {}
  const contactDocs = useDocuments<Contact>(contactIds)

  const [teamMembers, setTeamMembers] = useState<Member[]>(team.members())
  team.on("updated", () => setTeamMembers(team.members()))

  const getInvitationStatus = (invitationId?: Base58): InvitationStatus => {
    if (!invitationId || !team.hasInvitation(invitationId)) return "NOT_INVITED"
    const { uses, expiration, revoked } = team.getInvitation(invitationId)
    if (revoked) return "REVOKED"
    if (expiration < Date.now()) return "EXPIRED"
    return "PENDING"
  }

  // hooks ↑

  // Logged in member

  const selfIsAdmin = team.memberIsAdmin(user.userId)

  // Join contact docs with team members

  const contacts: ExtendedContact[] = Object.values(contactDocs)
    .map(contact => {
      const isMember = team.has(contact.userId)
      const member = isMember ? teamMembers.find(m => m.userId === contact.userId) : undefined
      const isAdmin = isMember ? team.memberIsAdmin(contact.userId) : false
      const isSelf = contact.userId === user.userId
      const fullName = `${contact.firstName} ${contact.lastName}`
      const invitationStatus = isMember ? undefined : getInvitationStatus(contact.invitationId)
      return {
        isSelf,
        fullName,
        isAdmin,
        invitationStatus,
        isMember,
        ...(isMember ? member : {}),
        ...contact,
      }
    })
    .sort(by("lastName"))

  const contactMap = Object.fromEntries(contacts.map(c => [c.userId, c]))
  const getContact = (userId: string) => contactMap[userId]
  const self = contacts.find(c => c.userId === user.userId)!

  return {
    team,
    user,
    self,
    contacts,
    contactMap,
    getContact,
  }
}
