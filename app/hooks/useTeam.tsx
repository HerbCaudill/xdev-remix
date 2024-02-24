import { useDocuments } from "@automerge/automerge-repo-react-hooks"

export const useTeam = () => {
  const { user, team, auth } = useAuth()
  const [rootDoc] = useRootDocument()
  const { signOut: _signOut } = useLocalState()

  // Team members
  const { contacts: contactIds = [] } = rootDoc ?? {}
  const contactDocs = useDocuments<Contact>(contactIds)

  const [teamMembers, setTeamMembers] = useState(team.members())
  team.on("updated", () => setTeamMembers(team.members()))

  // Logged in member
  const selfIsAdmin = team.memberIsAdmin(user.userId)

  const contacts = Object.entries(contactDocs)
    .map(([documentId, contact]) => {
      const isMember = team.has(contact.userId)
      const member = isMember ? teamMembers.find(m => m.userId === contact.userId) : {}
      const isAdmin = isMember ? team.memberIsAdmin(contact.userId) : false
      const isSelf = contact.userId === user.userId
      const fullName = `${contact.firstName} ${contact.lastName}`
      const canChangeAdminStatus = selfIsAdmin && !isSelf
      return {
        documentId,
        ...contact,
        ...member,
        isMember,
        isAdmin,
        isSelf,
        canChangeAdminStatus,
        fullName,
      }
    })
    .sort(by("lastName"))

  const contactMap = Object.fromEntries(contacts.map(c => [c.userId, c]))
  const getContact = (userId: string) => contactMap[userId]
  const self = contacts.find(c => c.userId === user.userId)!

  const signOut = async () => {
    const shareId = getShareId(team)
    await auth.removeShare(shareId)
    signOut()
  }

  return {
    team,
    user,
    contactMap,
    getContact,
    contacts,
    self,
    signOut: _signOut,
  }
}
