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

  if (!self || !contacts) return null
  return (
    <>
      <div
        className="my-3 grid w-full max-w-xl gap-x-4 border-t text-sm"
        style={{
          gridTemplateColumns: "min-content 2fr 1fr min-content min-content",
        }}
      >
        {/* One row per member */}
        {contacts.sort(by("lastName")).map(contact => {
          // Admin users can toggle status for team members other than themselves
          const canChangeAdminStatus = self.isAdmin && !contact.isSelf
          return (
            <div
              key={contact.userId}
              className="group col-span-5 grid grid-cols-subgrid items-center border-b p-2"
            >
              {/* Admin icon */}
              <div className="">
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
              </div>

              {/* Name & avatar */}
              <div className="flex w-2/3 flex-row items-center gap-2">
                <Avatar contact={contact} />
                <div className={cx({ "font-bold": contact.isSelf })}>{contact.fullName}</div>
              </div>

              {/* Invitation status */}
              <div className="w-1/3 whitespace-nowrap text-xs text-neutral-400">
                {contact.isMember ?
                  null
                : contact.invitationStatus === "PENDING" ?
                  "Invitation pending"
                : contact.invitationStatus === "REVOKED" ?
                  "Invitation revoked"
                : contact.invitationStatus === "EXPIRED" ?
                  "Invitation expired"
                : null}
              </div>

              {/* Invite or revoke button */}
              <div className="text-center">
                {!contact.isMember && !contact.isSelf && contact.invitationStatus !== "PENDING" ?
                  <Link
                    className={cx(button({ size: "xs", intent: "primary" }), "")}
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
                    className={button({ size: "xs", intent: "danger" })}
                  >
                    Revoke
                  </Link>
                : null}
              </div>

              {/* Remove Button */}
              <div className="">
                {contact.isMember && self.isAdmin && !contact.isSelf ?
                  <Link
                    to="/team/remove"
                    state={{ userId: contact.userId }}
                    title="Remove member from team"
                    className="opacity-10 hover:text-danger-500 hover:opacity-100"
                    children={<IconTrash className="size-4" />}
                  />
                : null}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

type InvitationStatus = "NOT_INVITED" | "PENDING" | "REVOKED" | "EXPIRED"

type Props = {
  self?: ExtendedContact
  contacts?: ExtendedContact[]
  onPromote?: (userId: string) => void
  onDemote?: (userId: string) => void
  onRemove?: (userId: string) => void
  onInvite?: (userId: string) => void
  onRevokeInvitation?: (userId: string) => void
}
