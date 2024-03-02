import { useTeam } from "hooks/useTeam"
import { Contact } from "types/types"
import { useInvitationGenerator } from "./hooks/useInvitationGenerator"
import { InviteMemberDialog } from "./ui/InviteMemberDialog"

export default function InviteMember() {
  const { userId } = useLocation().state as { userId: string }

  const { getContact, self } = useTeam()
  const navigate = useNavigate()

  const contact = getContact(userId)
  const invitationCode = useInvitationGenerator(contact)

  // ----- ↑ hooks

  // Only admins can invite new members
  if (!self?.isAdmin) return null

  return (
    <InviteMemberDialog
      afterLeave={() => navigate("..")}
      contact={contact}
      invitationCode={invitationCode}
    />
  )
}

export type Props = {
  afterLeave: () => void
  contact: Contact
  invitationCode?: string
}
