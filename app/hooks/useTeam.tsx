import { useDocuments } from "@automerge/automerge-repo-react-hooks"
import { by } from "lib/by"
import { Contact, ExtendedContact } from "types/types"
import { useRootDocument } from "hooks/useRootDocument"
import { useAuth } from "../context/auth/useAuth"
import { Member } from "@localfirst/auth"
import { getInvitationStatus } from "../lib/getInvitationStatus"

export function useTeam() {
  const { user, team } = useAuth()
  const [rootDoc] = useRootDocument()

  // Team members
  const { contacts: contactIds = [] } = rootDoc ?? {}
  const contactDocs = useDocuments<Contact>(contactIds)

  const [teamMembers, setTeamMembers] = useState<Member[]>(team.members())

  // hooks ↑

  // Update team members when the team changes
  team.on("updated", () => setTeamMembers(team.members()))

  // Join contact docs with team members

  const contacts: ExtendedContact[] = Object.values(contactDocs)
    .map(contact => {
      const isMember = team.has(contact.userId)
      const member = isMember ? teamMembers.find(m => m.userId === contact.userId) : undefined
      const isAdmin = isMember ? team.memberIsAdmin(contact.userId) : false
      const isSelf = contact.userId === user.userId
      const fullName = `${contact.firstName} ${contact.lastName}`
      const invitationStatus =
        isMember ? undefined : getInvitationStatus(team, contact.invitationId)
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
  const self = getContact(user.userId)

  return {
    team,
    user,
    self,
    contacts,
    contactMap,
    getContact,
  }
}
