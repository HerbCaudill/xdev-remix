import * as Auth from "@localfirst/auth"
import cx from "classnames"
import { useTeam } from "routes/auth+/hooks/useTeam"
import { SecondaryNav } from "ui/SecondaryNav"
import { InviteMember } from "./ui/InviteMember"
import { button } from "ui/cva/button"

export default function Team() {
  return (
    <div>
      <SecondaryNav heading="Team" />
      <div className="px-2">
        <TeamMembers />
      </div>
    </div>
  )
}

export const TeamMembers = () => {
  const { contacts, team, self } = useTeam()
  const getInvitationStatus = (invitationId?: Auth.Base58): InvitationStatus => {
    if (!invitationId || !team.hasInvitation(invitationId)) return "NOT_INVITED"
    const { uses, expiration, revoked } = team.getInvitation(invitationId)
    if (revoked) return "REVOKED"
    if (expiration < Date.now()) return "EXPIRED"
    return "PENDING"
  }

  const adminIcon = <IconCircleKey className="size-6 text-primary-500" />
  return (
    <>
      <table className="my-3 w-full max-w-xl text-sm">
        <thead>
          <tr className="border-b border-black text-xs uppercase text-neutral-700 *:p-2 *:font-normal">
            <th>Admin</th>
            <th className="w-1/2 text-left">Name</th>
            <th className="w-1/2"></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* One row per member */}
          {contacts.map(m => {
            const invitationStatus = getInvitationStatus(m.invitationId)
            return (
              <tr
                key={m.userId}
                className="group border-b *:h-12 *:p-1 *:align-middle [&>td>*]:block"
              >
                {/* Admin icon */}
                <td className="w-fit cursor-pointer">
                  {m.isMember ?
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
                        className={cx(`mx-auto hover:opacity-25 `, {
                          "opacity-100": m.isAdmin,
                          "opacity-0 disabled:opacity-0": !m.isAdmin,
                        })}
                        children={adminIcon}
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
                        // className={cx({ "opacity-0": !m.isAdmin })}
                        className="mx-auto w-fit"
                        children={adminIcon}
                      />

                  : null}
                </td>

                {/* Name  */}
                <td className="grow">
                  <span className="">{m.fullName}</span>
                </td>

                {self.isAdmin ?
                  <>
                    <td>
                      {/* Invitation status */}
                      {m.isMember ?
                        null
                      : invitationStatus === "PENDING" ?
                        "Invitation pending"
                      : invitationStatus === "REVOKED" ?
                        "Invitation revoked"
                      : invitationStatus === "EXPIRED" ?
                        "Invitation expired"
                      : null}
                    </td>
                    <td>
                      {/* Invite button */}
                      {!m.isSelf && invitationStatus !== "PENDING" ?
                        <Link className={button({ size: "xs" })} to={`/team/invite/${m.userId}`}>
                          Invite
                        </Link>
                      : null}
                    </td>
                  </>
                : null}

                {/* Remove Button */}
                <td>
                  {m.isMember && self.isAdmin && !m.isSelf ?
                    <button
                      title="Remove member from team"
                      className="opacity-10 hover:text-danger-500 hover:opacity-100"
                      onClick={() => {
                        team.remove(m.userId)
                      }}
                      children={<IconCircleX className="size-6" />}
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
