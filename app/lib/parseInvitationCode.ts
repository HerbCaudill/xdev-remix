export const parseInvitationCode = (invitationCode: string) => {
  const shareId = invitationCode.slice(0, 12) as ShareId // because a ShareId is 12 characters long - see getShareId
  const invitationSeed = invitationCode.slice(12) as Base58 // the rest of the code is the invitation seed
  return { shareId, invitationSeed }
}
