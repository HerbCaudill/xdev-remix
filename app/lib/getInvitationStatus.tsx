import { InvitationStatus } from "types/types"
import { Base58 } from "@localfirst/auth"

export const getInvitationStatus = (team: Team, invitationId?: Base58): InvitationStatus => {
  if (!invitationId || !team.hasInvitation(invitationId)) return "NOT_INVITED"
  const { uses, expiration, revoked } = team.getInvitation(invitationId)
  if (revoked) return "REVOKED"
  if (expiration < Date.now()) return "EXPIRED"
  return "PENDING"
}
