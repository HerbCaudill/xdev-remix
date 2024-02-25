import * as Auth from "@localfirst/auth"
import cx from "classnames"
import { InviteMember } from "./InviteMember"
import { useTeam } from "routes/auth+/hooks/useTeam"

export const TeamMembers = () => {
  const { contacts, team, self } = useTeam()
  const getInvitationStatus = (invitationId?: Auth.Base58): InvitationStatus => {
    if (!invitationId || !team.hasInvitation(invitationId)) return "NOT_INVITED"
    const { uses, expiration, revoked } = team.getInvitation(invitationId)
    if (revoked) return "REVOKED"
    if (expiration < Date.now()) return "EXPIRED"
    return "PENDING"
  }

  return (
    <>
      <table className="MemberTable w-full border-collapse text-sm my-3">
        <tbody>
          {/* One row per member */}
          {contacts.map(m => {
            const invitationStatus = getInvitationStatus(m.invitationId)
            return (
              <tr key={m.userId} className="border-t border-b border-gray-200 group">
                {/* Admin icon */}
                <td className="w-2 cursor-pointer">
                  {
                    m.canChangeAdminStatus ?
                      // Admin users can toggle status for team members other than themselves
                      <button
                        disabled={!self.isAdmin || m.isSelf}
                        onClick={() => {
                          if (m.isAdmin) team.removeMemberRole(m.userId, Auth.ADMIN)
                          else team.addMemberRole(m.userId, Auth.ADMIN)
                        }}
                        title={
                          m.isAdmin ? "Team admin (click to remove)" : "Click to make team admin"
                        }
                        className={cx(`px-1 m-1 hover:opacity-25 `, {
                          "opacity-100": m.isAdmin,
                          "opacity-0 disabled:opacity-0": !m.isAdmin,
                        })}
                        children="👑"
                      />
                      // Admin status can't be toggled if self isn't admin, or if contact isn't on team, or if contact is self
                    : <span
                        title={
                          !m.isMember ? "Contact is not on team"
                          : m.isSelf ?
                            "You are team admin"
                          : m.isAdmin ?
                            "Member is team admin"
                          : "Member is not team admin"
                        }
                        className={cx({ "opacity-0": !m.isAdmin })}
                        children="👑"
                      />

                  }
                </td>

                {/* Name  */}
                <td className="p-2">
                  <span className="Name ml-1">{m.fullName}</span>
                </td>

                {self.isAdmin ?
                  <>
                    <td>
                      {/* Invitation status */}
                      {m.isMember ?
                        null
                      : invitationStatus === "PENDING" ?
                        <span className="">Invitation pending</span>
                      : invitationStatus === "REVOKED" ?
                        <span className="">Invitation revoked</span>
                      : invitationStatus === "EXPIRED" ?
                        <span className="">Invitation expired</span>
                      : null}
                    </td>
                    <td>
                      {/* Invite button */}
                      {!m.isSelf && invitationStatus !== "PENDING" ?
                        <InviteMember userId={m.userId} />
                      : null}
                    </td>
                  </>
                : null}

                {/* Remove Button */}
                <td>
                  {m.isMember && self.isAdmin && !m.isSelf ?
                    <button
                      title="Remove member from team"
                      className="hover:opacity-100 opacity-10 font-bold text-xs text-white bg-red-500 rounded-full w-4 h-4"
                      onClick={() => {
                        team.remove(m.userId)
                      }}
                      children="⨉"
                    />
                  : null}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

type InvitationStatus = "NOT_INVITED" | "PENDING" | "REVOKED" | "EXPIRED"
