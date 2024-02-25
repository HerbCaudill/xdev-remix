import { createDevice } from "auth/createDevice"
import { SetupResult, JoinTeamInfo } from "./types"
import { initializeAuthRepo } from "auth/initializeAuthRepo"
import { parseInvitationCode } from "auth/parseInvitationCode"
import { eventPromise } from "lib/eventPromise"

export const joinTeam = async ({
  userName,
  invitationCode,
}: JoinTeamInfo): Promise<SetupResult> => {
  const user = Auth.createUser(userName) as UserWithSecrets
  const device = createDevice(user.userId)
  const { auth, repo } = await initializeAuthRepo({ user, device })

  const { shareId, invitationSeed } = parseInvitationCode(invitationCode)
  auth.addInvitation({ shareId, invitationSeed, userName })

  // Once we're admitted, we'll get the Team data
  const { team } = await eventPromise(auth, "joined")

  return { device, user, team, auth, repo }
}
