import cx from "classnames"
import { by } from "lib/by"
import { ExtendedContact } from "types/types"
import { button } from "ui/cva/button"
import { Avatar } from "ui/Avatar"

export const TeamMembers = ({
  self,
  contacts,
  onPromote = () => {},
  onDemote = () => {},
}: Props) => {
  const adminIcon = <IconCircleKey className="size-5 text-primary-500" />

  return (
    <>
      <table className="my-3 w-full max-w-xl text-sm">
        {/* <thead>
          <tr className="border-b border-black text-xs uppercase text-neutral-700 *:p-2 *:font-normal">
            <th>Admin</th>
            <th className="w-2/3 text-left">Name</th>
            <th className="w-1/3"></th>
            <th></th>
            <th></th>
          </tr>
        </thead> */}
        <tbody>
          {/* One row per member */}
          {contacts.sort(by("lastName")).map(contact => {
            // Admin users can toggle status for team members other than themselves
            const canChangeAdminStatus = self.isAdmin && !contact.isSelf
            return (
              <tr
                key={contact.userId}
                className="group border-b *:h-12 *:p-1 *:align-middle [&>td>*]:block"
              >
                {/* Admin icon */}
                <td className="w-fit ">
                  {contact.isMember ?
                    canChangeAdminStatus ?
                      <button
                        disabled={!self.isAdmin || contact.isSelf}
                        onClick={() => {
                          if (contact.isAdmin) onDemote(contact.userId)
                          else onPromote(contact.userId)
                        }}
                        title={
                          contact.isAdmin ?
                            "Team admin (click to remove)"
                          : "Click to make team admin"
                        }
                        className={cx(`mx-auto cursor-pointer hover:opacity-25`, {
                          "opacity-100": contact.isAdmin,
                          "opacity-0 disabled:opacity-0": !contact.isAdmin,
                        })}
                        children={adminIcon}
                      />
                      // Admin status can't be toggled if self isn't admin, or if contact isn't on team, or if contact is self
                    : <span
                        title={
                          !contact.isMember ? "Contact is not on team"
                          : contact.isSelf ?
                            "You are team admin"
                          : contact.isAdmin ?
                            "Member is team admin"
                          : "Member is not team admin"
                        }
                        className={cx({ "opacity-0": !contact.isAdmin }, "mx-auto w-fit")}
                        children={adminIcon}
                      />

                  : null}
                </td>

                {/* Name & avatar */}
                <td className="flex w-2/3 flex-row items-center gap-2">
                  <Avatar contact={contact} />
                  <div className={cx({ "font-bold": contact.isSelf })}>{contact.fullName}</div>
                </td>

                {self.isAdmin ?
                  <>
                    <td className="w-1/3 text-xs">
                      {/* Invitation status */}
                      {contact.isMember ?
                        null
                      : contact.invitationStatus === "PENDING" ?
                        "Invitation pending"
                      : contact.invitationStatus === "REVOKED" ?
                        "Invitation revoked"
                      : contact.invitationStatus === "EXPIRED" ?
                        "Invitation expired"
                      : null}
                    </td>
                    <td className="w-0">
                      {/* Invite button */}
                      {(
                        !contact.isMember &&
                        !contact.isSelf &&
                        contact.invitationStatus !== "PENDING"
                      ) ?
                        <Link
                          className={button({ size: "xs" })}
                          to="/team/invite"
                          state={{ userId: contact.userId }}
                        >
                          Invite
                        </Link>
                      : null}

                      {/* Revoke button */}
                      {contact.invitationStatus === "PENDING" ?
                        <Link
                          to="/team/revoke"
                          state={{ userId: contact.userId }}
                          title="Revoke invitation"
                          className={button({ size: "xs" })}
                        >
                          Revoke
                        </Link>
                      : null}
                    </td>
                  </>
                : null}

                {/* Remove Button */}
                <td className="w-0">
                  {contact.isMember && self.isAdmin && !contact.isSelf ?
                    <Link
                      to="/team/remove"
                      state={{ userId: contact.userId }}
                      title="Remove member from team"
                      className="opacity-10 hover:text-danger-500 hover:opacity-100"
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

type Props = {
  self: ExtendedContact
  contacts: ExtendedContact[]
  onPromote?: (userId: string) => void
  onDemote?: (userId: string) => void
  onRemove?: (userId: string) => void
  onInvite?: (userId: string) => void
  onRevokeInvitation?: (userId: string) => void
}
