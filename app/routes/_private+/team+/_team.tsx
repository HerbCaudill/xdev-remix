import { useTeam } from "hooks/useTeam"
import { SecondaryNav } from "ui/SecondaryNav"
import { TeamMembers } from "./ui/TeamMembers"

export default function Team() {
  const { contacts, team, self } = useTeam()
  return (
    <div>
      <SecondaryNav heading="Team" />
      <div className="px-2">
        <TeamMembers
          contacts={contacts}
          self={self}
          onPromote={() => {}}
          onDemote={() => {}}
          onRemove={() => {}}
          onInvite={() => {}}
          onRevokeInvitation={() => {}}
        />
        <Outlet />
      </div>
    </div>
  )
}
